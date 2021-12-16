

## Kotlin - 06 오류를 예방하는 타입 안전성

### NullPointerException - 그럼 Null 이 뭔가?

언어마다 다르다.
- **C** - NULL : 시스템에 정의된 NULL 값을 대입한다. 관례적으로 그냥 **0** 을 넣기도. 실제로 **0x0**을 넣는건 아니니 주의.

```C
/* 사실상 같은 표현 */
char *ptr1 = NULL;
char *ptr2 = 0;
```

- **Java, JavaScript, PHP, Dart(?)** - null : null은 null이지 0으로 대체할 수 없다. JavaScript의 경우에는, null과 undefined, NaN등을 모두 사용할 수 있어 혼용하기 쉽지만, 여기서 null은 특별히 '의도적으로 비워둔 값' 이라는 의미.
- Objective-C - NULL, nil, NIL :  NULL은 고전적인 C 널 포인터, NIL은 클래스 널 포인터, nil은 인스턴스 널 포인터. 혼용하면 주옥된다.
- Javascript - null, undefined, NaN 
- Solidity : null이란게 없다. 그냥 0을 쓴다.

=> 최신 언어들은 null reference를 배제하려 한다. **Null Safety**

** 출처) 나무위키

### Kotlin에서는 어떻게 안전하게 Null을 다루나?

> Design by Contract - 개발자는 함수나 메서드가 null을 받거나 리턴하는지 명확하게 표현할 수 있다.

- 참조가 null이 될 수 있으면 반드시 개발자가 null을 체크하는 코드를 작성하도록 강제한다.
- null에 사용할 수 있는 연산자를 제공한다.
- 이 모든게 컴파일 타임에 이루어진다. 바이트코드에는 아무것도 추가되지 않는다.

=> 뭔가 TypeScript와 JavaScript의 관계와 유사하단 생각이... 

### 또... 

- Convariance
- Contravariance

원래 지정된 것보다 더 많이 파생되거나(더 구체적인) 더 적게 파생된 형식(덜 구체적인)을 사용할 수 있는 능력을 지칭하는 용어.

**) [제네릭의 공변성(Covariance) 및 반공변성(Contravariance)](https://docs.microsoft.com/ko-kr/dotnet/standard/generics/covariance-and-contravariance){:target="_blank"}

### Any, Nothing

- Base Class, Any - 코틀린의 어떤 클래스든, Any 클래스를 상속받는다.
- 함수가 절대로 리턴하지 않는다면, Nothing이 리턴 타입이 된다. 그 함수는 예외(Exception)만 발생시킨다.

*리턴하지 않으면 Unit 이잖냐?*

아니다. 그러니까, 그 함수는 결코 코드 블럭의 마지막에 다다를 일이 없을 거란 뜻이다. Nothing은 순전히 컴파일러가 타입 무결성을 검증하기 위함이다.


### Nullable Type

그저.. 타입의 접미에 **?**을 붙이면 Nullable Type이 된다. 그러니까 String 타입이었던 어떤 변수에서 Null도 가질 수 있게 하려면, 그저 String? 타입으로 명시하면 된다는 뜻이다. 이 경우 Kotlin은 이 변수의 어떤 속성에 접근하기 전에 반드시 null인지를 체크하도록 강제한다.
일반적으로 Java와 같이 쓸 일이 없는 경우 null이 존재하지 않도록 하는게 좋다. 그러나 만약 명시적으로 쓰려는 경우, 그에 맞는 조치 - null인지를 체킹한다거나 - 가 필요하다


### Safe Call Operator ({variable}?)

어떤 인스턴스가 Nullable이면 매번 체킹하는 구문을 짜야 한다고 했던가? 꼭 If문을 사용할 필요는 없다. 형태는 다르지만 다음처럼 쓸 수 있다

```kotlin
var name : String?  
println(name?.length)
```

### Elvis Operator ({nullable} ?: {alternative value})


```kotlin
var name : String?  
println(name?.length ?: "No Name")
```

### Not-Null Assertion (!!)

그저 악(Evil). 이런게 있다는 것을 잊어라.


```kotlin
var name : String?  
println(name!!.length) // NullPointerException - Bad
```

### When 과의 궁합 - 매우 좋다

```kotlin
var name : String?
when (name) {
  null => 0
  else => name.length
}
```

### 타입 체크 - 런타임

타입 체킹은 확장성을 봤을때 최소한으로 해야. Fragile Code. 그러나 이는 매우 유용하기 때문에 할 때는 해야 한다.

Kotlin에서 `equals` 메서드는 `==`로 매핑되어있다. 이는 만약 String 타입끼리 equals로 비교할 경우 타입 체킹이 아닌 동일한 문자열인지를 검증한다. 이를 다시 참조 타입으로 다시 오버라이드하려면, `is`연산자를  사용하면 된다.

```kotlin
class Food {
  override operator fun eat(main_dish: Any?) = main_dish is Food
}
```

### 스마트 캐스트

캐스트(cast) 는 강제 타입 변환이다. 그러니까 뭔가 스마트하게 타입을 알아서 바꿔주는 그런걸 해준다고 생각하면 되겠다. `is` 연산자로 해당 타입임이 확인이 된 이후에는 해당 타입으로 자동으로 캐스팅이 되는 기능이다.


### 명시적 타입 캐스팅

컴파일러가 헷갈려할 때만 사용. `as`, `as?` 연산자를 이용할 수 있다. `as?` 연산자는 캐스팅이 실패하면 null을 할당.


### 제네릭

코드 재사용보다 타입 안전성이 우선이다. 제네릭은 이 두 사이의 균형을 맞춰준다.


