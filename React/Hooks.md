# React Hook

## useState, useEffect

```javascript
const [data, setData] = useState(0);
```

- 변수를 동적으로 할당할 때 사용하는 hook

# useState

```javascript
useEffect(() => {}, []);
```

- 함수 뒤 매개변수로 []안에 props등을 넣어줘야 해당 변수가 업데이트 되었을 때 값을 변경시켜준다.
- DidComponenetUpdate같은 기능
- [] 안에 매개변수가 없다면 Mount, UnMount기능이다
