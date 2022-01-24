# 빌더 패턴(Builder Pattern)

```
빌더 패턴은 생성자에 들어갈 매개 변수가 많든 적든 차례차례 매개 변수를 
받아들이고 모든 매개 변수를 받은 뒤에 이 변수들을 통합해서 한번에 사용하는 패턴
```

> 객체의 생성 과정과 표현 방법을 분리한 것

</br>

## 구조

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F5qpI2%2FbtqAPehLl2e%2FqzvbFnYMhHV265k04U3gDk%2Fimg.png
" alt="msa" width="600"/></p>

</br>

- Builder추상클래스를 정의하고 이를 상속받은 ConcreteBuilder서브클래스를 구현한다.
- Product의 일부가 build될 때마다 Director는 Builder에 통보한다.
- Builder는 Director의 요청을 처리해 Product에 부품을 추가한다.

</br>

## 빌더 패턴의 장점

1. 필요한 데이터만 설정 가능
2. 유연성 확보
3. 가독성 높임
4. 불변성 확보

</br>

## 단점

1. 생성 비용이 성능에 문제가 될 수 있다.
2. 매개변수가 4개 이상일 때 값어치가 있다.
3. API 업데이트로 매겨번수가 많아지면 코드가 더 커진다.

</br>

## 점층적 사용자 패턴

- 예시

```java
public class Member {

    private final String name;
    private final String location;
    private final String hobby;

    // 필수 생성자
    public Member(String name) {
        this(name, "출신지역 비공개", "취미 비공개");
    }

    // 1 개의 선택적 인자를 받는 생성자
    public Member(String name, String location) {
        this(name, location, "취미 비공개");
    }

    // 모든 선택적 인자를 다 받는 생성자
    public Member(String name, String location, String hobby) {
        this.name = name;
        this.location = location;
        this.hobby = hobby;
    }
}
```

</br>

- 호출 예시

```java
// 호출 코드만으로는 각 인자의 의미를 알기 어렵다.
NutritionFacts cocaCola = new NutritionFacts(240, 8, 100, 3, 35, 27);
NutritionFacts pepsiCola = new NutritionFacts(220, 10, 110, 4, 30);
NutritionFacts mountainDew = new NutritionFacts(230, 10);
```

</br>

## 자바빈 패턴

- 예시

```java
NutritionFacts cocaCola = new NutritionFacts();
cocaCola.setServingSize(240);
cocaCola.setServings(8);
cocaCola.setCalories(100);
cocaCola.setSodium(35);
cocaCola.setCarbohdydrate(27);
```

</br>


## 빌더 패턴 ( Effective Java )

- 예시

```java
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;

    public static class Builder {
        // Required parameters(필수 인자)
        private final int servingSize;
        private final int servings;

        // Optional parameters - initialized to default values(선택적 인자는 기본값으로 초기화)
        private int calories      = 0;
        private int fat           = 0;
        private int carbohydrate  = 0;
        private int sodium        = 0;

        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings    = servings;
        }

        public Builder calories(int val) {
            calories = val;
            return this;    // 이렇게 하면 . 으로 체인을 이어갈 수 있다.
        }
        public Builder fat(int val) {
            fat = val;
            return this;
        }
        public Builder carbohydrate(int val) {
            carbohydrate = val;
            return this;
        }
        public Builder sodium(int val) {
            sodium = val;
            return this;
        }
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }

    private NutritionFacts(Builder builder) {
        servingSize  = builder.servingSize;
        servings     = builder.servings;
        calories     = builder.calories;
        fat          = builder.fat;
        sodium       = builder.sodium;
        carbohydrate = builder.carbohydrate;
    }
}
```

</br>

- 객체 생성 예시 1

```java
NutritionFacts.Builder builder = new NutritionFacts.Builder(240, 8);
builder.calories(100);
builder.sodium(35);
builder.carbohydrate(27);
NutritionFacts cocaCola = builder.build();

```

- 객체 생성 예시 2

```java
NutritionFacts cocaCola = new NutritionFacts
    .Builder(240, 8)    // 필수값 입력
    .calories(100)
    .sodium(35)
    .carbohydrate(27)
    .build();
```

## Lombok @Builder

- 예시

```java
@Builder
public class NutritionFacts {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;
    private final int carbohydrate;
}
```

- 사용 1

```java
NutritionFacts.NutritionFactsBuilder builder = NutritionFacts.builder();
builder.calories(230);
builder.fat(10);
NutritionFacts facts = builder.build();
```

- 사용 2

```java
NutritionFacts facts = NutritionFacts.builder()
    .calories(230)
    .fat(10)
    .build();
```
