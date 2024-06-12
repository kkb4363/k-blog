# JavaScript

- **promise는 아래 사이트 참고**
  [자바스크립트 프로미스 튜토리얼 - 자바스크립트의 프로미스를 이행하거나 거부하는 방법](https://www.freecodecamp.org/korean/news/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js/)
- **?? 와 || 의 차이**

  - https://ko.javascript.info/nullish-coalescing-operator

- **Array Buffer**

  ```jsx
  메모리 관리
  Array Buffer에 대해서 알아 보기 전에 메모리 관리에 대해서 알아 볼 필요가 있다.
  어떤 머신을 서랍장 머신에 탑재된 메모리를 서랍의 한 칸이라고 생각해보자.
  이러한 서랍 한 칸(메모리)은 1층, 2층이라는 주소가 부여된다. 이 주소를 이용하여 서랍 칸(메모리)에 어떤 물건(데이터)을 넣어야하는지 식별한다.
  서랍 칸마다 동일한 크기를 가지고 있는데 이 크기는 서랍장(머신)의 종류에 따라 결정 된다.
  이 크기를 word-size라고 하며 통상적으로 32비트 또는 64비트의 크기를 가지고 있다.
  이러한 메모리에 할당을 하는 방법을 알아보자.

  예를 들어 8비트의 word-size를 가진 메모리에 숫자 2를 넣는다고 가정하면 숫자 2를 이진법으로 변화한 값을 아래와 같이 넣어준다.
  00000010

  또 다른 예로 알파벳 H를 저장하는 경우에는 H를 숫자로 변환해주는 인코딩 도구가 필요하다. (UTF-8)
  인코더로 H를 숫자로 만들고 그 숫자의 값을 다시 이진법으로 변환하여 메모리에 저장을 해준다.
  저장했던 정보를 다시 가져올 때는 반대로 디코더를 이용하여 H로 변환해준다.

  메모리 자동 관리
  자바스크립트에서는 자바스크립트 자체적으로 메모리 문제를 책임진다. 즉, 우리가 메모리에 접근할 수 없다는 뜻이다.

  예를들어 변수를 만든는 상황에서는 "Create a variable called greeting and set it to 'Hello'" 라는 주문을 자바스크립트 엔진에게 해주면 js엔진은 값을 인코더로 변환하고 그 값을 이진수로 변환한다.
  그리고 비어있는 메모리 공간을 찾아 이진수 값을 넣어준다. 즉, 자바스크립트 엔진은 개발자와 메모리 사이에서 중재자 역할을 해준다. 이 과정이 자바스크립트에서 메모리 할당을 하는 과정이다.

  그리고 여기서 메모리 누수를 방지하기 위해 더 이상 참조되지 않는 변수를
  메모리에서 제거 하는것을 가비지 컬렉션이라 한다.
  또한 개발자가 메모리 관리를 하지 않는 언어(Memory-Managed-Language)에서는
  메모리 관리의 편한 장점이 있지만 그만큼 약간의 성능저하가 따른다.

  Array Buffer
  Array Buffer를 이요하면 js에서도 데이터를 수동으로 관리할 수 있는 여지가 생긴다.
  메모리 자동 관리 방식이 개발자를 편하게 만들어주나 실행 성능 측면에서 오버헤드가 발생하는 문제점을 어느정도 해결할 수 있다.

  우리가 변수를 만들 때, js 엔진은 보통 변수가 필요하는 그 이상의 공간을 확보한다.(보통 2~8배의 메모리 슬롯을 확보) 따라서 공간 낭비가 일어나는 것이다. 또, js 객체를 만들고 사용하는 어떤 패턴은 가비지 컬렉터가 제대로 동작하지 않는다.
  따라서 이러한 문제점들을 메모리 수동 관리 방식을 이용해 상황에 맞는 메모리 할당, 해지 정책을 할 수 있다.

  하지만 보통 수동 관리를 할 만큼의 성능 저하가 발생하지도 않고 수동 관리를 한다고 해도 성능이 오히려 더 떨어지는 경우도 있다. 하지만 상황에 맞게 사용하면 성능 향상을 시킬 수 있고 Array Buffer를 사용한다.

  typed array
  Array Buffer는 일반 배열과 비슷하게 동작하지만 들어가는 데이터 타입을 지정할 수 없다.
  Array Buffer는 오로지 숫자로 표현가능한 바이트열이 들어간다. [00000010]와 같이 들어간다.
  그리고 우리가 바이트 값을 직접 Array Buffer에 추가하지 않는다. 또 Array Buffer 자체는 단지 0과 1이 한 줄로 나열된 덩어리이며 요소끼리의 구분이 어디에 위치하는지도 모른다.
  따라서 문맥에 맞는 정보를 제공하려면 view라고 불리는것으로 감싸야한다. view로 표현된 데이터를 typed array(형식화 배열)에 추가가 가능하다. js에서는 view를 다룰 수 있는 다양한 형식화 배열을 제공한다.
  예로 Int8 typed array을 이용해 데이터 덩어리를 8비트 단위의 바이트 값들로 나눌 수 있다.
  또 한개의 버퍼에 여러개의 view를 적용하는 것도 가능하다.

  이런 방식으로 Array Buffer는 기본적으로 메모리 자체인 것처럼 동작한다.
  ```

- **navigator.mediaDevices**

  ```jsx
  devicechange : 사용자 컴퓨터에 미디어 입출력 장치가 추가, 제거됐을 때
  (= ondevicechange)

  enumerateDevices : 시스템에서 사용 가능한 미디어 입출력 장치의 정보를 담은 배열을 가져옴

  getUserMedia : 사용자에게 권한을 요청 후, 시스템의 카메라, 오디오 각각 혹은 모두 활성화하여, 장치의 입력 데이터를 비디오/ 오디오 트랙으로 포함한 MediaStream을 반환

  const stream = await window.navigator.mediaDevices.getUserMedia({
  								audio:{
  									deviceId:'~~~',
  									autoGainControl:true,
  									noiseSuppression:true,
  									echoCancellation:true,
  									},
  								video: false,
  							});
  deviceId : 특정 오디오를 사용할 경우
  autoGainControl : 음원이 소스 미디어의 볼륨 변화를 자동으로 관리하여 전체 볼륨 레벨을 일정하게 유지하는 기능
  noiseSuppression : 주변 소음 제거
  echoCancellation : 에코 제
  ```

- **문서 객체 모델 (Document Object Model, DOM)**
  - **말 그대로 웹페이지 내의 모든 콘텐츠를 객체로 나타내는 것**
  - **웹페이지 → document**
  - **document를 자유롭게 다루기 위해서 객체화 하고자 구현된 개념**
  - **그리고 HTML tag, 글자, 속성 등 document의 담겨있는 모든 요소들을 하나하나 객체화 한 단위를 가리켜 Node라고 함**
  - [**https://bigtop.tistory.com/50**](https://bigtop.tistory.com/50)
