---
layout: post
title: "Kotlin: 람다를 사용한 함수형 프로그래밍"
date: 2022-01-16 19:33:51.943 +0900
categories: Study Kotlin
tags: kotlin lambda functional
---

### 함수형, 명령형, 객체지향형

- Early Java: 명령형 + 객체지향형. 최근에 점진적으로 함수형 스타일을 수용 중이다. 그러나 코틀린은 태생부터 셋 모두 지원.


### 함수형이 뭔가? : 선언적 스타일 + 고차함수


```kotlin
/* 명령형 */
var doubleOfEven = mutableListOf<Int>()
for (i in 1..10) {
  if (i % 2 == 0) {
    doubleOfEven.add(i * 2)
  }
}
```


```kotlin
/* 함수형 */
var doubleOfEven = (1..10)
  .filter { e -> e % 2 == 0 }
  .map { e -> e * 2 }
```


함수형 스타일은 명령형에 비해 쓰긴(human-write) 어렵지만 읽기(human-read) 쉽다.


### 람다표현식

```kotlin
{ parameter list -> body }
```

- 생략 예시 1

```kotlin
fun isPrime(n: Int) => n > 1 && (2 until n).none({ i: Int -> n % i == 0 })
```

`(2 until n)`은 IntRange 클래스의 인스턴스이고, none 메서드 구현 둘 중 하나는 람다를 인자로 받고, boolean을 리턴하도록 오버로딩하고 있다. 컨텍스트상 i는 Int 타입이니 람다식의 인자 타입이 생략되었다. 또한 none 메서드의 마지막 파라미터가 람다이므로 괄호`()`가 생략되었다.


```kotlin
fun isPrime(n: Int) => n > 1 && (2 until n).none{ i -> n % i == 0 }
```

또한 람다의 인자가 하나면, `->`을 생략하면서 해당 인자를 `it`으로 표현할 수 있다


```kotlin
fun isPrime(n: Int) => n > 1 && (2 until n).none{ n % it == 0 }
```

- 생략 예시 2


```kotlin
fun walk1to(action: (Int) -> Unit, n: Int) = (1..n).forEach { action(it) }

walk1To({ i -> print(i)}, 5)
```

순서를 바꾸면 코틀린이 제공하는 편리한 구문을 이용할 수 있다


```kotlin
fun walk1to( n: Int, action: (Int) -> Unit) = (1..n).forEach { action(it) }

walk1To(5) { print(it) }
```

action은 람다로 정의되어 있으므로 더욱 간략하게 표현 가능하다. 
함수 `print`를 람다로 사용하고 싶다면, **함수참조** `::`를 이용하면 된다.


```kotlin
fun walk1to( n: Int, action: (Int) -> Unit) = (1..n).forEach(action)

walk1To(5, ::print)
```

이외에 다음 구문들도 더욱 간략하게 생략 가능하다.

```kotlin
walk1To(5, i -> System.out.println(i))

// to be...
walk1To(5, System.out::println)
```

```kotlin
fun send(i: Int) = println(i) 
walk1To(5, i -> send(i))

// to be...
walk1To(5, this::send)
```

```kotlin
object Message {
  fun send(i: Int) = println(i) 
}
walk1To(5) { i -> Message.send(i) }

// to be...
walk1To(5, Message::send)
```


### 함수를 리턴하는 함수

```kotlin
fun doubler(mul: Int): (Int) -> Int {
  return { i -> i * mul }
}

walk1To(10) { doubler(5)(it) }
// [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
```

### 람다를 변수에 할당

타입 추론을 위해 변수 혹은 람다에 타입 추론이 필요

```kotlin
var mul : (Int) -> Int = { i -> 2 * i }
println((1..10).map(mul))

// or
var mul = { i: Int -> 2 * i }
println((1..10).map(mul))
```

### 익명 함수

=> 딱히 이점이 없다. 그냥 람다 쓰면 된다. 필요한 경우가 있기는 하다

```kotlin
var mul = fun(i: Int): Int { return 2 * i }
println((1..10).map(mul))

// can be
println((1..10).map(fun(i: Int): Int { return 2 * i }))

// but Error
println((1..10).map { fun(i: Int): Int { return 2 * i }) }
```

## 클로저와 렉시컬 스코핑

람다는 클로저라고도 한다.

```kotlin
var mul = { i: Int -> 2 * i }

// make (2) variable
var mulFactor = 2
val mul2 = { i: Int -> mulFactor * i }
````

컴파일러는 `mulFactor`를 찾기 위해 스코프를 괄호 밖으로 확장해야 한다. 이 확장은 해당 변수를 찾을 때까지 계속 확장되는데, 이게 렉시컬 스코핑이다.

위에서 `mulFactor`는 람다 안에서 변경 가능하다. 이런 Mutability는 함수형 프로그래밍의 금기사항이나, Kotlin은 이에 대해 별 신경 안쓴다.


## 비지역성, 라벨 리턴

람다는 리턴값이 있어도 return 키워드를 사용할 수 없다. 그러나 예외 존재

### 라벨(labeled) 리턴

현재의 람다에서 즉시 나갈 때 사용. 해당 람다 앞에 `label@` 문법으로 미리 만들고, `return@label` 형식으로 리턴할 수 있다.

```kotlin
val list = (1..10).map buy@ { i:Int ->
  if (i % 3 == 0) {
    return@buy i*3
  }
  i*4
}
println(list)
```
`buy` 를 해당 람다를 인자로 받는 함수의 이름 등으로 생략할 수도 있으나, 명시적으로 적기를 권장.

### 비지역성(non-local) 리턴

람다를 호출한 함수에서 빠져나가는 리턴이다. 다음 섹션에서 좀 더 분명해진다

## 람다를 이용한 인라인 함수

람다를 쓸 때는 퍼포먼스를 유의해야 하는데, 코틀린에서 이를 위해 `inline` 키워드를 제공한다. 인라인 람다는 `forEach()`와 같은 함수에서 리턴을 사용하는 것처럼 비지역적 흐름을 제어하는 데에 사용된다. **함수가 `inline`으로 선언되어 있으면 함수를 호출하는 대신 함수의 바이트코드가 함수를 호출하는 위치에 들어가게 된다.** 긴 함수를 인라인으로 사용하는건 별로. 함수 호출의 오버헤드를 제거하지만 전체 바이트코드는 커지게 된다.

### 선택적 노인라인(noinline) 파라미터

인라인 함수의 람다 인자 중 특정 람다 인자를 인라인 최적화에서 제외시킬 수 있다.

```kotlin
inline fun invokeTwo (
  n: Int,
  action1: (Int) -> Unit,
  noinline action2: (Int) -> Unit
): (Int) -> Unit { ... }
```

action2 람다는 인라인 최적화에서 제외될 것이다.

### 인라인 람다에서는 비지역적 리턴이 가능

그러니까 인라인 함수의 람다는 바이트코드로 최적화되면서 콜스택이 깊어지지 않게 되고 비지역적 리턴을 사용하여 해당 인라인 함수를 바로 빠져나갈 수 있게 된다.


### 크로스인라인 파라미터


만약 action2람다를 invokeTwo 함수에서 직접 호출하지 않는다면, 인라인 람다가 될 수 없어 에러가 발생한다. 그럴 경우엔, 다음과 같이 crossinline으로 정의하면, 호출할 때 인라인 최적화가 된다.

```kotlin
inline fun invokeTwo (
  n: Int,
  action1: (Int) -> Unit,
  crossinline action2: (Int) -> Unit
): (Int) -> Unit {
  ...
  return { i: Int -> action2(n) }
}
```


### 인라인과 리턴을 위한 연습

언젠가 해보겠..


## 정리

함수형을 써봤다.
