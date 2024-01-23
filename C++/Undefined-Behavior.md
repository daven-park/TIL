# Undefined Behavior

- Low Level Language에서 주로 사용되는 단어
- Java와 같은 언어와 다르게 정의되지 않은 동작이 발생하면 UB가 실행된다.
- 특정상황에 오류가 발생해도 알려주지 않아 파악이 어려울 수 있으므로 특정 상황을 알아두는 것이 도움이 된다.

<br/>

# UB Example

1. Divide by 0

   - 0으로 나누게 되면 결과값을 예측할 수 없어 발생하게 되는 오류

2. Uninitialized Variables

   - 초기화되지 않은 값을 참조했을 때 발생하는 오류

3. Access Null Pointer

   - NULL 포인터에 접근하는 오류

4. Index Out Of Bound

   - 인덱스 범위 초과

5. Signed Integer Overflow

   - 자료형의 범위를 초과하게 되면 보수 처리등의 특징으로 인해 원하지 않는 값이 나오게 되는 오류

6. Modify String Literal

   - 문자열 포인터를 수정하게 됐을 떄 발생하는 오류로 포인터 자체인 변수의 값을 수정할 수 없다.

7.
