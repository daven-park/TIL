# JPA (Java Persistence API)

# JPA Dto와 Entity의 차이

- JPA에서 Dto는 Request, Response를 처리하기 위한 클래스로 사용합니다. 기존 MVC 패턴에서 사용했던 테이블 매핑과 다르게 필요한 변수만 설정하여 RequestBody등과 같이 매핑합니다.
- Entity는 테이블과 매핑하는 용도입니다. 테이블과 객체를 연결하기 때문에 제약조건 설정이 철저하게 이루어져야 합니다. 특히 1대다, 다대1을 표현하기 위한 어노테이션도 필요합니다.
  
```java
@Getter
@NoArgsConstructor
@Entity
@Table(name = "comment")
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "artwork_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Artwork artwork;
```

