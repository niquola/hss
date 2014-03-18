---
layout: post
title:  FormStamp
date:   2014-03-18 13:30:00
author: Dmitry Nechaev
member: dima
tags:
  - Open Source, FormStamp, AngularJS
---

#FormStamp - библиотека виджетов для AngularJS

##Мотивация

AngularJS - это стремительно набирающий популярность JS-фреймворк, упрощающий разработку сложных и динамичных веб-приложений. Наша команда использует AngularJS в ряде проектов со сложным пользовательским интерфейсом, и в процессе работы мы остро ощущали нехватку хорошей библиотеки, предоставляющей набор единообразных виджетов, таких как datetime picker, select, multiple select и так далее. Конечно, нам было
известно о проекте [Angular UI](http://angular-ui.github.io/), но некоторых виджетов, которые нам были нужны, AngularUI не предоставлял.

Кроме того, мы хотели иметь аналог рельсового form builder-а, но на фронтенде. Form builder позволяет программисту описывать форму декларативно, беря на себя генерацию разметки и вывод ошибок.

Однако, для работы с формами приходится писать много boilerplate кода и при использовании AngularJS. Помимо этого, на данный момент существует не так много виджетов, рассчитанных на тесную интеграцию с AngularJS.

Решением этих проблем стала разработанная нами библиотека FormStamp, которая предоставляет:

- Form Builder - наивысший уровень для работы с формами, созданный по аналогии с генераторами форм из экосистемы Ruby on Rails;
- набор виджетов, покрывающих 80% задач, встречающихся при работе с формами и не решаемых стандартными элементами HTML5;
- низкоуровневые компоненты, позволяющие собирать новые виджеты.

При разработке в библиотеку были заложены следующие принципы:

- все виджеты написаны "с нуля" с использованием директив AngularJS, что позволяет сократить код и сделать его более читаемым;
- полная интеграция с AngularJS (поддержка ngModel, ngRequired...);
- стилизация по-умолчанию с помощью Bootstrap.

##Инструкция по установке

FormStamp может быть подключен в ваш проект с помощью пакетной системы Bower:

    bower install angular-formstamp

##Form Builder
Выразительный декларативный подход AngularJS снижает количество кода, который нужно написать для создания UI. Однако, даже с использованием этого подхода при создании простой формы с проверками заполненности полей и отображением сообщений об ошибках приходится писать много повторяющегося кода:

{% highlight html %}
    <form class="form-horizontal" role="form" name="form" ng-app="form-demo">

        <div class="form-group" ng-class="{'has-error': form.username.$invalid}">
            <label for="username" class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="username" placeholder="Username" required="required" ng-pattern="/awesome/" name="username" ng-model="username" />
                <p class="alert alert-danger" ng-show='form.username.$error.pattern'>Username should be awesome</p>
            </div>
        </div>

        <div class="form-group" ng-class="{'has-error': form.email.$invalid}">
            <label for="email" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="email" placeholder="Email" required="required" name="email" ng-model="email" />
                <p class="alert alert-danger" ng-show='form.email.$error.email'>Email should be valid</p>
            </div>
        </div>

        <div class="form-group" ng-class="{'has-error': form.password.$invalid}">
            <label for="password" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="password" placeholder="Password" required="required" name="password" ng-model="password" ng-minlength='6' />
                <p class="alert alert-danger" ng-show='form.password.$error.minlength'>Password should be longer</p>
            </div>
        </div>

        <div class="form-group">
            <label for="birthDate" class="col-sm-2 control-label">Birth Date</label>
            <div class="col-sm-10">
                <input type="date" class="form-control" id="birthDate" placeholder="Birth Date" ng-model="birthDate" />
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">Sign up</button>
            </div>
        </div>
    </form>
{% endhighlight %}

Эту проблему решает компонент Form Builder - для создания формы достаточно указать:

- модель, с которой связана форма;
- атрибуты модели, которые отображаются в форме;
- типы элементов формы, соответствующие каждому из отображаемых в форме атрибутов.

С помощью Form Builder указанную выше форму с подсветкой ошибок можно создать намного меньшим количеством кода:

{% highlight html %}
<fs-form-for model="samurai">
  <fieldset class="form-horizontal">
    <fs-input as="text" name="username" required="" label="Name"></fs-input>
    <fs-input as="email" name="email" required="" label="Email"></fs-input>
    <fs-input as="password" name="password" required="" label="Email"></fs-input>
    <fs-input as="fs-date" name="birthdate" required="" label="Date of Birth"></fs-input>
  </fieldset>
</fs-form-for>
{% endhighlight %}

Пояснения:
- fsFormFor - директива, создающая форму, атрибут `model` указывает на модель, для которой создается форма;
- fsInput   - директива, описывающая каждый элемент в форме со следующими атрибутами:
  - as - тип элемента формы;
  - name - имя атрибута модели;
  - label - текст метки.

Все остальные атрибуты делегируются элементу формы, указанному в атрибуте as.

## Набор виджетов
Чем сложнее ваше приложение, тем меньше вам будет хватать стандартных элементов форм и тем скорее вам понадобятся дополнительные виджеты. На данный момент существует не так много виджетов, рассчитанных на интеграцию с AngularJS, а из тех, что есть, часть является оберткой над jQuery-виджетами. Библиотека FormStamp содержит написанные с нуля с использованием API AngularJS виджеты, решающие те задачи, с которыми мы сталкивались чаще всего в нашей работе:

- select с возможностью фильтрации по введенному значению;
- select с поддержкой freetext (combo box) ;
- multiselect с возможностью фильтрации по введенному значению;
- multiselect с поддержкой freetext (tags input);
- radiogroup;
- checkboxes;
- виджеты для работы с датой и/или временем и календарь.

Рассмотрим работу с select виджетом, для создания которого используется директива fsSelect. Директива подерживает атрибуты freetext, items, ng-model, ng-required, ng-disabled.

Атрибут
    freetext
(по умолчанию false) определяет поведение виджета. При
    freetext=false
виджет ведет себя как select, то есть позволяет выбрать один элемент из списка вариантов. При
    freetext=true
виджет ведет себя как combo box, то есть позволяет выбрать значение из списка вариантов или ввести любое другое.

Атрибут
    items
указывает, какое свойство скоупа содержит список вариантов, отображаемых в виджете. При
    freetext=false
варианты могут быть как объектами, так и примитивными типами.
При
    freetext=true
варианты могут быть только строками.

Атрибут
    ng-model
использует тот же API, что и стандартная директива [ngModel][].

Атрибут
  ng-disabled
указывает, какое свойство скоупа определяет, будет ли виджет disabled/enabled.

Для создания combo box, варианты которого содержатся в $scope.array_of_options, выбранный вариант связан со $scope.selected_option, а состояние disabled/enabled зависит от $scope.flag, запишем директиву следующим образом:
{% highlight html %}
<div fs-select items=”array_of_options” ng-disabled=”flag” ng-model=”selected_option” freetext=”true”></div>
{% endhighlight %}


Примеры работы с остальными виджетами и Form Builder размещены на [странице библиотеки][github.io].

## Директивы
Для того, чтобы облегчить написание дополнительных виджетов, мы начали выделять части функциональности в низкоуровневые директивы:

- fsList - отображает список элементов, позволяет выделять элемент в списке и перемещать выделение с клавиатуры;
- fsNullForm - скрывает элемент формы, связанный с ngModel от родительской формы;
- fsInput - упрощает обработку событий клавиатуры и смены фокуса;
- fsCalendar - отображает календарь и позволяет отмечать дату, как выбранную.

Для примера создадим плей-лист для плеера, используя fsList и fsInput. Работа с fsList происходит с помощью взаимодействия с listInterface свойством на $scope. listInterface имеет следующие свойства:

* selectedItem - текущее выбранное значение. Только на чтение.
* onSelect(value) - Обработчик события выбора значение. Должен быть реализован пользователем.
* move(d) - Функция, которая перемещает указатель на указанное количество элементов.

Создадим директиву, которая будет оборачивать в себя audio тег c html5:
{% highlight js %}
  app.directive("demoAudio", function() {
    return {
      restrict: "E",
      scope: {
        track: '='
      },
      template: "<audio controls />",
      replace: true,
      link: function($scope, $element, $attrs) {
        return $scope.$watch('track', function(track) {
          $element.attr('src', track.stream_url + "?client_id=8399f2e0577e0acb4eee4d65d6c6cce6");
          return $element.get(0).play();
        });
      }
    };
  });
{% endhighlight %}

Подключим SoundCloud SDK

{% highlight html %}
<script src="http://connect.soundcloud.com/sdk.js"></script>
{% endhighlight %}
Далее создадим контроллер, для связывания этих элементов:

{% highlight js %}
function ListDemoCtrl($scope) {
  // Инициализация SoundCloud SDK
  SC.initialize({
    client_id: '8399f2e0577e0acb4eee4d65d6c6cce6'
  });

  // Реализация поиска по SoundCloud
  $scope.$watch('search', function () {
    SC.get('/tracks',
           { q: $scope.search, license: 'cc-by-sa' },
           function(tracks) {
             $scope.$apply(function() { $scope.tracks = tracks })
           })
  });

  $scope.search = 'bach';
  $scope.tracks = [];

  // Оборачиваем функцию для перемещения выбранного значения в fsList
  $scope.move = function (d) {
    $scope.listInterface.move(d);
  };

  // Добавляем обработчик выбранного значения в fsList
  $scope.listInterface = {
    onSelect: function (selectedItem) {
      $scope.select(selectedItem)
    }
  };

  $scope.select = function(selectedItem) {
    $scope.selectedTrack = selectedItem || $scope.listInterface.selectedItem;
  };
}
{% endhighlight %}

И само приложение:

{% highlight html %}
<div ng-controller="ListDemoCtrl" style="postion: relative;">
  <div class="row">
    <div class="col-xs-7">
      <!-- Инициализируем fsInput и добавляем обработчики клавиатуры  -->
      <input class="form-control" autofocus="1" fs-input
             fs-up="move(-1)" fs-down="move(1)" fs-enter="select()"
             ng-model="search">
      <!-- Инициализирум fsList и передаем ему список треков -->
      <div fs-list="" items="tracks" class="no-popup">
        <!-- Описываем внутренний темплейт переданних треков -->
        <img src="{{ item.artwork_url }}" width="30" height="30">
        {{item.title}} <small class="text-muted">{{item.genre}}</small>
      </div>
    </div>
    <div class="col-xs-5">
      <!-- Связиваем выбранное значение в fsList с аудио-плеером -->
      <demo-audio track="selectedTrack"></demo-audio>
      <pre style="margin-top: 20px;">Selected Item: {{ selectedTrack | json }}</pre>
    </div>
  </div>
</div>
{% endhighlight %}

В результате получаем вот такой плеер:
<img src="/screenshots/playlist.png"/>
Живой пример вы можете посмотреть здесь.

В следующей статье мы более подробно рассмотрим создание формы с использованием FormStamp.

[Демо и описание библиотеки][github.io]

[Код библиотеки][github.com]

[Страница команды][healthsamurai]

[github.io]: http://formstamp.github.io/ "FormStamp"
[github.com]: https://github.com/formstamp/formstamp
[healthsamurai]: http://healthsamurai.github.io/
[ngModel]: http://docs.angularjs.org/api/ng/directive/ngModel
