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


## 비지역성(non-local)과 라벨(labeled) 리턴