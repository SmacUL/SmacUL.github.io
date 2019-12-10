- 首先在 ES6 以前, JS 创建 "类" 就和灾难一样, 
- 以下的内容更多的应该是了解, (因为有 ES6 的存在)


## 属性的特征: 

一个新的概念: 属性的特性, 它是用来描述属性的各种特征的; 

- 修改某一对象的某一属性特征: 

    使用 `Object.defineProperty()` ; 

- 查看某一对象的某一属性特征: 

    使用 `Object.getOwnPropertyDescriptor()` ;

  

### 属性的四个特征

- Configurable

     一旦 Configurable 被设置为 false , 除了 Writable 以外的特征都无法修改; 


    上面那句话是不是有问题? 那 Value ?

- Writable

    能否写入; 

- Enumerable

    能否通过 for in 循环返回属性; 

- Value

    记录值;



## 访问器属性 

- 访问器属性不包含数据值, 但是包含一对 getter 和 setter 方法; 

- 访问器属性看起来有点像 Bean 中的属性; 
 

### 访问器属性的四个特征

- Configurable
- Enumerable
- Get
- Set



如果, 访问器属性只设置了 getter , 它将处于只读状态; 

如果, 访问器属性只设置了 setter , 它将处于只写状态; 

此外, 访问器属性习惯在属性名前面加一个 下划线 , 告知他人, 此属性不可随意读写; 

``` JS
var book = { 
    _year: 2004, 
    edition: 1 
}; 

Object.defineProperty(book, "year", { 
        get: function(){ 
            return this._year; 
        },    
        set: function(newValue){
            if (newValue > 2004) {
                this._year = newValue; 
                this.edition += newValue - 2004; 
        } 
    } 
}); 

```
由于没有类的概念, 大家只能使用 函数 来 "声明类" ; 

任何一个函数, 如果在被调用的时候, 使用的是 new 关键字, 就会被视作 "类" 的构造函数; 



一种比较好的对象创建方式: 


上述代码是一种混合模式, 



使用构造函数模式记录 "类" 的变量, 使用原型模式记录 "类" 的方法; 

构造函数模式会为每一个 "类" 创建一个完整的独一无二的实例, 

原型模式更像是单例模式, 无论 new 了多少个对象, 对象引用指向的都是同一块内存; 



构造函数模式不适合创建有很多方法的情况, 因为方法往往只需要一个; 

::: warning 疑问
方法都只需要一个真的好吗 , 如果有异步操作 会不会串扰; 
:::