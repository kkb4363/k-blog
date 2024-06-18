# Flutter

## **List랑 Grid**

- **다른 위젯과 겹칠 땐 ? Stack ㄱ**

- **GridView.count() → 원하는 행이나 열 수를 지정 가능**

```dart
GridView.count(
	crossAxisCount:2, // 한 줄에 2개씩 나와
	children: List.generate(100, (index) {
		return Center(
			child: Text(
				'Item $index',
				),
			),
		}),
	),
```

- **자식 위젯 사이즈에 맞게 스크롤 되게 하려면 Constraint ㄱㄱ**

```dart
Scaffold(
        body: LayoutBuilder(builder: (context, constraints) {
          return SingleChildScrollView(
            child: ConstrainedBox(
              constraints: BoxConstraints(minHeight: constraints.maxHeight),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: List.generate(
                    items, (index) => ItemWidget(text: 'Item $index')),
              ),
            ),
          );
        }),
      ),
    );
```

## 스크롤링

- **스크롤 멋지게 하려면 아래 링크**
  [https://docs.flutter.dev/ui/layout/scrolling/slivers](https://docs.flutter.dev/ui/layout/scrolling/slivers)
- **스크롤 내릴때 앱바 없애고 오르면 다시 생기게 하려면?**

  ```dart
  // SilverAppBar 쓰면 됨

  CustomScrollView(
  	silvers:[
  		const SilverAppBar(
  			title:'this is title',
  			floating:true, // 스크롤 내릴때 앱바 없애는거 동의하는거
  			expandedHeight:200 , // 앱바 크기 조절하는
  ```

- **이제 앱바말고 내용이 스크롤할 때 느리게 생성되게 하려면?**

  ```dart
  // SilverGrid or SilverList 쓰면 됨

  SilverList(
  	delegate:SilverChildBuilderDelegate(
  		(context, index) => ListTile(title: Text('Item $index')),
  		childCount:100,
  		),
  	),
  ```

- **스크롤 할 때 시차 효과 적용되게도 할 수 있음 - Flow**

## 적응형 디자인

- **화면의 크기에 맞게 하려면?**

```dart
// 1번
class FormFactor {
	static double desktop = 900;
	static double tablet = 600;
	static double handset = 300;
}

ScreenType getFormFactor(BuildContext context) {
  // Use .shortestSide to detect device type regardless of orientation
  double deviceWidth = MediaQuery.of(context).size.shortestSide;
  if (deviceWidth > FormFactor.desktop) return ScreenType.desktop;
  if (deviceWidth > FormFactor.tablet) return ScreenType.tablet;
  if (deviceWidth > FormFactor.handset) return ScreenType.handset;
  return ScreenType.watch;
}

// 2번
enum ScreenSize { small, normal, large, extraLarge }

ScreenSize getSize(BuildContext context) {
  double deviceWidth = MediaQuery.of(context).size.shortestSide;
  if (deviceWidth > 900) return ScreenSize.extraLarge;
  if (deviceWidth > 600) return ScreenSize.large;
  if (deviceWidth > 300) return ScreenSize.normal;
  return ScreenSize.small;
}

// 3번
Widget foo = LayoutBuilder(builder: (context, constraints) {
  bool useVerticalLayout = constraints.maxWidth < 400;
  return Flex(
    direction: useVerticalLayout ? Axis.vertical : Axis.horizontal,
    children: const [
      Text('Hello'),
      Text('World'),
    ],
  );
});
```

- **스크롤 아래로? 위로?**
  ```dart
  return Listener(
    onPointerSignal: (event) {
      if (event is PointerScrollEvent) print(event.scrollDelta.dy);
    },
    child: ListView(),
  );
  ```

## 제스처

- **드래그 - LongPressDraggable**

  - 위 위젯은 길게 누를 때를 인식한 후 사용자의 손가락 근처에 새 위젯을 표시함
  - 사용자가 드래그하면 위젯이 사용자의 손가락을 따라감

- **스와이프하여 닫기 구현**

  - 플러터에선 기본으로 있음

  ```dart
  // Dismissible 쓰면 됨

  itemBuilder: (context, index) {
    final item = items[index];
    return Dismissible(
      // Each Dismissible must contain a Key. Keys allow Flutter to
      // uniquely identify widgets.
      key: Key(item),
      // Provide a function that tells the app
      // what to do after an item has been swiped away.
      onDismissed: (direction) {
        // Remove the item from the data source.
        setState(() {
          items.removeAt(index);
        });

        // Then show a snackbar.
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text('$item dismissed')));
      },
      child: ListTile(
        title: Text(item),
      ),
      // 아직까지는 이걸 쓰면 사용자가 목록에서 항목을 스와이프할 순 있지만
      // 그렇게 할 때 어떤 일이 발생하는진 시각적으로 표시하진 않아서
      // 아래처럼 bg 색깔 줘야함
        background: Container(color: Colors.red),
                child: ListTile(
                 title: Text(item),
       ),
      );
    );
  },
  ```

## 네비게이션 및 경로

- **탭바를 만들고 싶을땐?**

```dart
**//TabController를 쓰면 된다

return MaterialApp(
  home: DefaultTabController(
    length: 3,
    child: Scaffold(
      appBar: AppBar(
        bottom: const TabBar(
          tabs: [
            Tab(icon: Icon(Icons.directions_car)),
            Tab(icon: Icon(Icons.directions_transit)),
            Tab(icon: Icon(Icons.directions_bike)),
          ],
        ),
      ),
      body: const TabBarView(
            children: [
              Icon(Icons.directions_car),
              Icon(Icons.directions_transit),
              Icon(Icons.directions_bike),
            ],
		      ),
		    ),
		  ),
		);**
```

## 애니메이션 & 트랜지션

- **Dart language tricks**

```dart
animation = Tween<double>(begin: 0, end: 300).animate(controller)
  ..addListener(() {
    // ···
  });

 //위 코드에서 ..은 아래 코드랑 똑같은 기능을 함

 animation = Tween<double>(begin: 0, end: 300).animate(controller);
animation.addListener(() {
    // ···
  });
```

- **페이드인 페이드아웃**

```dart
AnimatedOpacity(
  // If the widget is visible, animate to 0.0 (invisible).
  // If the widget is hidden, animate to 1.0 (fully visible).
  opacity: _visible ? 1.0 : 0.0,
  duration: const Duration(milliseconds: 500),
  // The green box must be a child of the AnimatedOpacity widget.
  child: Container(
    width: 200,
    height: 200,
    color: Colors.green,
  ),
)
```
