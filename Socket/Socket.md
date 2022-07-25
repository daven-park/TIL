# Socket
> Server와 Client가 Port를 통해 실시간 양방향 통신하는 방식

- TCP/IP 기반이지만 표준이 아닌 하나의 프로그래밍 인터페이스
- 실시간으로 통신하는 특성으로 연결지향형 방식
- 5-Tuple 데이터 포멧으로 통신
    1. 프로토콜(TCP, UDP)
    2. 자신의 IP Address
    3. 자신의 Port Number
    4. 목적지 IP Address
    5. 목적지 Port Number

<br/>

## 1️⃣ Stream sockets - TCP

```
- 양방향 바이트 스트림 전송, 연결 지향성
- 신뢰성 보장
- 데이터가 순차적으로 송수신
- point to point 연결
```

![tc](https://on1ystar.github.io/public/img/socket/socket-1-3.png)

<br/>

|함수명|기능|
|:---:|:---:|
|socket()|소켓 생성|
|bind()|사용할 자신의 IP Port 등록|
|listen()|연결 되지 않은 소켓을 요청 수신 대기 모드로 전환|
|connect()|TCP Client 에서 Server와 연결하기 위해 소켓 목적지 IP와 Port 지정|
|accept()|Client의 요청 수락 후 연결|
|send(), recv()|Client와 Server간 데이터 송수신|
|close()|소켓 종료|


<br/>

## 2️⃣ Datagram sockets - UDP
```
- 비연결형 소켓
- 신뢰성 보장 X
- 데이터 순서 보장 X
- point to point 뿐만 아니라 일대다 가능
```
![udp](https://on1ystar.github.io/public/img/socket/socket-1-4.png)

> connect()후 바로 데이터 전송

<br/>

## Web Socket

> 양방향 소통 프로토콜

```
- HTML5 웹 표준 기술
- WEB API로 라이브러리나 패키지 추가 없이 브라우저에서 사용 가능
- string형 데이터 전송
- 이벤트를 단순히 듣고, 보내는 것만 가능
```

<br/>

## Socket.io

> 웹소켓 기술 활용 라이브러리

```
- 소켓 연결 실패 시 fallback을 통해 다른 방식의 클라이언트 연결 시도
- Room 개념을 통해 클라이언트에게만 데이터 전송하는 `브로드캐스팅` 가능
```

<br/>

## Socket 서버 구현 코드입니다(참고용)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _1016Server
{
    enum LogType { RUN, STOP, CONNECT, DISCONNECT, ERROR }

    class WbServer
    {
        #region 맴버 필드 및 프로퍼티
        private Socket server;
        private Form1 form;
        private List<Socket> slist = new List<Socket>();

        public string ServerIp { get; private set; }
        public int ServerPort  { get; private set;  }

        #endregion

        #region 기능(외부 접근) Form1에서 접근

        public void ParentInfo(Form1 f)
        {
            form = f;
        }

        public bool ServerRun(int port)
        {
            try
            {
                server = new Socket(AddressFamily.InterNetwork,
                                           SocketType.Stream, ProtocolType.Tcp);
                IPEndPoint ipep = new IPEndPoint(IPAddress.Any, port);
                server.Bind(ipep);
                server.Listen(20);

                IPEndPoint ip = (IPEndPoint)server.LocalEndPoint;
                ServerIp = ip.Address.ToString();
                ServerPort = port;

                Thread th = new Thread(new ParameterizedThreadStart(ServerThread));
                th.Start(this);
                th.IsBackground = true;

                return true;
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
                return false;
            }
        }

        public void ServerStop()
        {
            try
            {
                server.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        #endregion

        #region 기능(내부 사용) WbServer -> Form1으로 전달하는 함수
        private void LogMessage(LogType type, Socket sock, string str)
        {
            IPEndPoint ip = (IPEndPoint)sock.RemoteEndPoint;

            String temp = String.Empty;

            if (type == LogType.CONNECT)
            {
                temp = String.Format("[클라이언트접속]{0}:{1} 성공",
                      ip.Address, ip.Port);
            }
            else if(type == LogType.DISCONNECT)
            {
                temp = String.Format("[클라이언트접속해제]{0}:{1} 성공",
                      ip.Address, ip.Port);
            }
            else if(type == LogType.ERROR)
            {
                temp = String.Format("[에러]{0}:{1} {2}",
                      ip.Address, ip.Port, str);
            }

            form.LogMessage(temp);    
        }
        
        private void ShortMessage(byte[] recvdata)
        {
            form.ShortMessage(Encoding.Default.GetString(recvdata));
        }
        
        #endregion

        #region(내부 사용) 자체 호출 기능

        private void SendAllData(Socket sock, byte[] msg)
        {
            foreach (Socket s in slist)
            {
                SendData(s, msg);
            }
        }

        private void SendData(Socket sock, byte[] data)
        {
            try
            {
                int total = 0;
                int size = data.Length;
                int left_data = size;
                int send_data = 0;

                // 전송할 데이터의 크기 전달
                byte[] data_size = new byte[4];
                data_size = BitConverter.GetBytes(size);
                send_data = sock.Send(data_size);

                // 실제 데이터 전송
                while (total < size)
                {
                    send_data = sock.Send(data, total, left_data, SocketFlags.None);
                    total += send_data;
                    left_data -= send_data;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private void ReceiveData(Socket sock, ref byte[] data)
        {
            try
            {
                int total = 0;
                int size = 0;
                int left_data = 0;
                int recv_data = 0;

                // 수신할 데이터 크기 알아내기 
                byte[] data_size = new byte[4];
                recv_data = sock.Receive(data_size, 0, 4, SocketFlags.None);
                size = BitConverter.ToInt32(data_size, 0);
                left_data = size;

                data = new byte[size];

                // 실제 데이터 수신
                while (total < size)
                {
                    recv_data = sock.Receive(data, total, left_data, 0);
                    if (recv_data == 0) break;
                    total += recv_data;
                    left_data -= recv_data;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }
       
        #endregion

        #region thread

        private void ServerThread(object data)
        {
            while (true)
            {
                Socket client = server.Accept();

                slist.Add(client);      //소켓 저장

                LogMessage(LogType.CONNECT, client,"");   //로그메시지 처리  

                //스레드 생성(소켓 전달)
                Thread tr = new Thread(new ParameterizedThreadStart(WorkThread));
                tr.Start(client);
                tr.IsBackground = true;
            }
        }

        private void WorkThread(object data)
        {
            Socket sock = (Socket)data; 

            byte[] msg = null;
            try
            {
                while (true)
                {
                    //수신
                    ReceiveData(sock, ref msg);   // 수신한 문자열이 있으면 화면에 출력
      
                    ShortMessage(msg);

                    //송신
                    //SendData(sock, msg);
                    SendAllData(sock, msg);   //SendData(sock, msg)  

                    msg = null;
                    
                }
            }
            catch(Exception ex)
            {
                LogMessage(LogType.ERROR, sock, ex.Message);
                LogMessage(LogType.DISCONNECT, sock,"");
               

                slist.Remove(sock); //소켓 제거

                sock.Close();  
            }                   
        }
        #endregion         
    }
}

```



# 참고 사이트

- [websocket vs Socket.io](https://www.peterkimzz.com/websocket-vs-socket-io/)
- [소켓프로그래밍](https://on1ystar.github.io/socket%20programming/2021/03/16/socket-1/)