# Android

## UI Component

1. EditTest  

    编辑文本
    - hint 文本提示
    - inputType 控制输入类型
        - text 文本
        - number 数字
        - numberPassword 数字密码
        - textPassword 字符密码

2. ViewText  

    文本标签

3. Button  

    按钮
    - background 设置按钮背景

4. RadioButton  

    单选按钮

5. RadioGroup  

    单选按钮组，在这个按钮组中放置RadioButton（单选按钮）

6. Switch  

    开关
    - textOff
    - textOn
    - thumb 设置轨道样式 轨道长度通常是按钮长度的两倍
    - checked

7. ToggleButton  

    开关按钮
    - textOff 关闭时显示的文字
    - textOn 打开时显示的文字
    - checked 设置按钮状态
        - true
        - false

8. AnalogClock  

    时钟组件
    - dial 表盘样式
    - hand_minute 时针样式

9. TextClock  

    时钟文本

10. Chronometer  

    计时器
    setCoChronometerTickListener
    - setBase 起始时间
        - SystemClock.elapsedRealtime 系统启动到现在的时间（包括睡眠）
        - SystemClok.uptimeMilis
    - setFormat 字符串 显示时间的格式
    - start 开始计时
    - stop 结束计时

## View

1. ImageView  

    图片标签
    - attr
        - scaleType
            - CENTER 图像居中，不执行缩放
            - CENTER_CROP
            - CENTER_INSIDE

1. ListView

    列表
    ``` xml
    <ListView>
    </ListView>
    ```

1. GridView

    多行多列的网状结构，网格视图

    如果网格内cell的尺寸是一致的，就比较适合使用这种东西，而不再需要去使用臃肿的TableLayout。

    - horizontalSpace

1. RecyclerView

    回收循环视图

    RV听说是用来代替ListView的，强制使用ViewHolder。RV在LV的基础对创建方式作出了修改，如果屏幕可以显示n个item，RV一共会创建n+1个item，当前面第一个item显示完之后，它会被接替到队列的最后一个。换句话说，整个队列就和松毛虫一样，脑袋咬着另一个的屁股

## Layout

1. LinearLayout 线性布局
    - orientation
        - vertical 垂直方向，一行只有一个元素，其它依次向下排列
        - horizontal 水平方向，只有一行，其它依次向右排列

    - TextView默认占有一定的高度和宽度

1. FrameLayout 框架布局
    - 相当于一个单纯的div，所有的元素会重叠在一起

1. AbsoluteLayout 绝对布局

1. RelativeLayout 相对布局

1. TableLayout 表格布局
    - 布局中包含表格行TableRow，每一个TableRow中会定义一个具体的元素，
    - 这种布局方式不会显示row columns或cell的边框线
    - 表格由列和行组成许多的单元格，单元格不能跨列

1. GridLayout
    - 这种东西可以用来代替TableLayout

## Adapter

1. ArrayAdapter

    简单、易用的Adapter，用于将数组绑定为列表项的数据源，支持泛型操作

    - 适配器需要绑定的三个参数：
        - context 代表方位Android应用的接口？？？（ 不知道就先用this来代替）
        - testViewResourceId 资源Id，代表一个TestView
        - 数组/链表 列表项展示的数据

    - 在MainActivity中，需要做的事情：
        - 创建一个ListView
        - 创建一个链表用于存放数据
        - 创建适配器，需要三个参数，适配器要能获得所有的数据
        - 最后ListView将setAdapter，将创建好的Adapter带进去

    - 缺点
        - 每个列表项只能是TextView，自定义的能力比较弱

1. SimpleAdapter

    功能强大的Adapter，用于将XML中控件绑定为列表项的数据源

    使用步骤（完整的内容可以参照下方BaseAdapter的写法）
    - 在xml文件布局上实现ListView

        也可以是其他View，比如GridView

    - 实现ListView中每行的布局

        自己意淫去吧。

    - 定义一个HashMap构成的列表一键值对的方式存放数据
        ``` Java
        /**
         * 假设已经定义好了name、address、price三个数组，数组长度相同
         */
        ArrayList<HashMap<String, Object>> itemList = new ArrayList<>();
        for (int i = 0; i < name.length; i++) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("name", name[i]);
            map.put("address", address[i]);
            map.put("price", price[i]);
            itemList.add(map);
        }
        ```

    - 构造SimpleAdapter对象，设置适配器
        ``` Java
        SimpleAdapter mySimpleAdapter = new SimpleAdapter(
            this,
            itemList,
            R.layout.item,
            new String[] {"name", "address", "price"},
            new int[] {R.id.name, R.id.address, R.id.price}
        )
        ```
        此处的SimpleAdapter一共接收了5个参数，从上到下分别是
        - context
        - 需要绑定的数据
        - 单元布局（可能是一行，也可能是一列）
        - ArrayList中每一个HashMap的String标签，用于获取相应的对象
        - 单元布局内控件的id，将相应的控件对象进行绑定

    - 将ListView绑定到SimpleAdater上

1. SimpleCursorAdapter

    与SimpleAdapter类似，用于绑定游标（直接从数据数取出数据）作为列表项的数据源

1. BaseAdapter

    可自定义ListView，通用用于被扩展。扩展BaseAdapter可以对各个列表项进行最大程度的定制。

    - 比较复杂，在继承BaseAdapter的基础上需要实现四个方法
        - getCount()
        - getItem(int position)
        - getItemId(int position)
        - getView(int position, View convertView, ViewGroup parent)

    - 关于BaseAdapter的相关操作，看底下

        下方的几段代码设置了两个不同的ListView，并将两个BaseAdapter绑定到这两个ListView上。

        - activity_main.xml
            ``` xml
            <LinearLayout
                android:orientation="vertical"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

                <ListView
                    android:id="@+id/listA"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:divider="#f00"
                    android:dividerHeight="2dp"
                    android:headerDividersEnabled="false"></ListView>

                <ListView
                    android:id="@+id/listB"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:divider="#0f0"
                    android:dividerHeight="2dp"
                    android:headerDividersEnabled="false">
                </ListView>
            </LinearLayout>

            ```
        - item1.xml
            ``` xml
            <TextView
                android:id="@+id/listAText"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:textSize="24dp"
                android:padding="10px"
                android:shadowColor="#f0f"
                android:shadowDx="4"
                android:shadowDy="4"
                android:shadowRadius="2"/>
            ```
        - item2.xml
            ``` xml
            <RelativeLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content">

                <TextView
                    android:id="@+id/listBText"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    />

                <CheckBox
                    android:id="@+id/listBCheckBox"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_alignParentRight="true"
                    />
            </RelativeLayout>
            ```
        - MyBaseAdapterA.java
            ``` Java
            public class MyBaseAdapterA extends BaseAdapter {

                private LayoutInflater mInflater;
                ArrayList<HashMap<String, Object>> listAItem;

                public MyBaseAdapterA(Context context, ArrayList<HashMap<String, Object>> listAItem) {
                    this.mInflater = LayoutInflater.from(context);
                    this.listAItem = listAItem;
                }

                @Override
                public int getCount() {
                    return listAItem.size();
                }

                @Override
                public Object getItem(int position) {
                    return listAItem.get(position);
                }

                @Override
                public long getItemId(int position) {
                    return position;
                }

                private static class ViewHolder {
                    TextView listAText;
                }

                @Override
                public View getView(int position, View convertView, ViewGroup parent) {
                    ViewHolder viewHolder;
                    if (convertView == null) {
                        viewHolder = new ViewHolder();
                        convertView = mInflater.inflate(R.layout.item1, null);
                        viewHolder.listAText = convertView.findViewById(R.id.listAText);
                        convertView.setTag(viewHolder);
                    } else {
                        viewHolder = (ViewHolder) convertView.getTag();
                    }

                    viewHolder.listAText.setText((CharSequence) listAItem.get(position).get("listAText"));
                    return convertView;
                }
            }
            ```
        - MyBaseAdapterB.java
            ``` Java
            public class MyBaseAdapterB extends BaseAdapter {

                private LayoutInflater mInflater;
                private ArrayList<HashMap<String, Object>> listBItem;

                public MyBaseAdapterB(Context context, ArrayList<HashMap<String, Object>> listBItem) {
                    this.mInflater = LayoutInflater.from(context);
                    this.listBItem = listBItem;
                }

                /**
                 * 此处省略getCount、getItem、getItemId三个方法
                 * 可以参照MyBaseAdapterA.java中的内容
                 */

                private static class ViewHolder {
                    TextView listBText;
                    CheckBox listBCheckBox;
                }

                @Override
                public View getView(int position, View convertView, ViewGroup parent) {
                    MyBaseAdapterB.ViewHolder viewHolder;
                    if (convertView == null) {
                        viewHolder = new MyBaseAdapterB.ViewHolder();
                        convertView = mInflater.inflate(R.layout.item2, null);
                        viewHolder.listBText = convertView.findViewById(R.id.listBText);
                        viewHolder.listBCheckBox = convertView.findViewById(R.id.listBCheckBox);
                        convertView.setTag(viewHolder);
                    } else {
                        viewHolder = (MyBaseAdapterB.ViewHolder) convertView.getTag();
                    }

                    viewHolder.listBText.setText((CharSequence) listBItem.get(position).get("listBText"));
                    viewHolder.listBCheckBox.setChecked((Boolean) listBItem.get(position).get("listBCheckBox"));
                    return convertView;
                }
            }

            ```
        - MainActivity.java
            ``` Java
            public class MainActivity extends AppCompatActivity {

                private ListView listA;
                private ListView listB;
                private TextView text;

                public static final String tag = "MainActivity";

                @Override
                protected void onCreate(Bundle savedInstanceState) {
                    super.onCreate(savedInstanceState);
                    setContentView(R.layout.activity_main);
                    /**
                     * ListA
                     */ 
                    listA = findViewById(R.id.listA);

                    ArrayList<HashMap<String, Object>> listAItem = new ArrayList<>();
                    HashMap<String, Object> hashMap = new HashMap<>();
                    hashMap.put("listAText", "孙悟空");
                    listAItem.add(hashMap);
                    hashMap = new HashMap<>();
                    hashMap.put("listAText", "猪八戒");
                    listAItem.add(hashMap);
                    hashMap = new HashMap<>();
                    hashMap.put("listAText", "牛魔王");
                    listAItem.add(hashMap);

                    MyBaseAdapterA myBaseAdapterA = new MyBaseAdapterA(this, listAItem);
                    listA.setAdapter(myBaseAdapterA);

                    /**
                     * ListB
                     */ 
                    listB = findViewById(R.id.listB);
                    ArrayList<HashMap<String, Object>> listBItem = new ArrayList<>();
                    hashMap = new HashMap<>();
                    hashMap.put("listBText", "Java");
                    hashMap.put("listBCheckBox", true);
                    listBItem.add(hashMap);
                    hashMap = new HashMap<>();
                    hashMap.put("listBText", "Hibernate");
                    hashMap.put("listBCheckBox", true);
                    listBItem.add(hashMap);
                    hashMap = new HashMap<>();
                    hashMap.put("listBText", "Spring");
                    hashMap.put("listBCheckBox", true);
                    listBItem.add(hashMap);
                    hashMap = new HashMap<>();
                    hashMap.put("listBText", "Android");
                    hashMap.put("listBCheckBox", true);
                    listBItem.add(hashMap);

                    MyBaseAdapterB myBaseAdapterB = new MyBaseAdapterB(this, listBItem);
                    listB.setAdapter(myBaseAdapterB);
                }
            }
            ```

1. RecyclerView.Adapter

## Android 事件处理

1. 基于监听器的事件处理机制

``` java
public void onCreate(Bundle sav)
Button button = findViewById(R.id.button);
Text text = findViewById(R.id.text);
// 匿名内部类
button.setOnClickListener(new View.OnClickListener() {
    public void onClick(View view) {
        text.setText("");
    }
});

// ??
button.setOnClickListener(this);
public void onClick(View view) {
    text.setText("");
}
```

1. 基于回调的事件处理机制

## 关于AS无法渲染画面（design视图中）

res values styles.xml中的主题添加一个 Base

## Gradle

gradle是一种和maven类似的项目构建工具，除了编译代码，还需将项目发布到实际的环境中，中间需要经历各种测试，生成不同类型的报告，这一流程如果让人来做，效率会很低且错误率高，就需要像gradle这样的工具来自动完成这一流程。gradle与作为行业标准的maven相比，会显得更加简洁，阅读起来更加人性化。

build.gradle描述了整个项目的整体构建基础

    - project目录下的Gradle 描述从什么地方下载Android Plugin for Gradle
    - app目录下的Gradle 描述了整个app的Gradle配置

project目录下的Gradle

``` Gradle
// Top-level build file where you can add configuration options common to all sub-projects/modules.
buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.4'
        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        google()
        jcenter()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

app目录下的Gradle

``` Gradle
apply plugin: 'com.android.application'

android {
    compileSdkVersion 28
    defaultConfig {
        applicationId "com.example.smacul.myapplication"
        minSdkVersion 24
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:28.+'
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.1'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.1'
}

```

- buildscript{...} 配置了驱动build的代码，它声明将在Maven中央仓库，取一个classpath dependency，也就是Android plugin for Gradle v3.1.4
- apply plugin     指明了用到的plugin是android，就像前面java程序中，用的plugin是java一样
- android{...}     中配置了所有android构建的参数，这里也就是Android DSL的入口点。

## Android 多线程

Android 的UI和其他的GUI库一样都是线程不安全，想要更新UI就必须在主线程中修改。



- 线程安全
  
    线程安全就是说多线程访问同一代码，不会产生不确定的结果。编写线程安全的代码是低依靠线程同步。JVM中有一个 Main Memory，而每个线程有一个 Working Memory，线程对 Main Memory 中的变量进行修改就需要在自己的 Working Memory 中弄出一份副本，修改完毕之后再写回到 Main Memory 中，如果有多个线程对同一个变量进行修改，就会导致线程不安全。使用 synchronized 可以对变量加锁，实现线程安全。

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <EditText
        android:id="@+id/my_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />

    <Button
        android:id="@+id/my_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="开始倒计时"/>

    <TextView
        android:id="@+id/my_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="50pt"/>
</LinearLayout>
```

```Java
public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText editText;
    private Button button;
    private TextView textView;
    private int second;
    private static Handler handler;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        editText = findViewById(R.id.my_text);
        button = findViewById(R.id.my_button);
        textView = findViewById(R.id.my_view);
        button.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        // 获取秒数
        second = Integer.parseInt(String.valueOf(editText.getText()));
        // 设置handler，每次收到消息就修改
        handler = new Handler() {
            public void handleMessage(Message msg) {
                textView.setText(String.valueOf(msg.what));
            }
        };

        // 创建子线程
        // 使用for循环和sleep方法每隔一秒向主线程发送消息
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    for (int i = second; i >= 0; i--) {
                        Message message = new Message();
                        message.what = i;
                        handler.sendMessage(message);
                        Thread.sleep(1000);
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
```

## 碎片 Fragment

安卓的碎片是一种能够嵌入在活动中的 UI 碎片。它需要自己的布局文件，还需要一个继承自 `Fragment` 的类并重写 `Fragment` 类中的 `onCreateView` 方法来返回 View。

``` Java
public class FirstFragment extends Fragment {

    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_first, container, false);
        return view;
    }

}
```

在 main 的布局文件中需要使用 `fragment` 标签来导入需要的 Fragment 。

可以利用 FragmentTransaction 来对碎片的显示隐藏进行操作。 FragmentTransaction 就像数据库的操作一样，先创建一个事务，再提交

``` Java
FragmentTransaction transaction;
Fragment firstFragment;
Fragment secondFragment;

transaction = getSupportFragmentManager().beginTransaction();
firstFragment = getSupportFragmentManager().findFragmentById(R.id.firstFragment);
secondFragment = getSupportFragmentManager().findFragmentById(R.id.secondFragment);
transaction.hide(firstFragment);
transaction.show(secondFragment);
transaction.commit();
```

这段代码先创建了事务，然后隐藏了 firstFragment ，显示 secondFragment 。最后 commit 这个事务。这里的事务只有一次说明，只要 commit 了，就要重新创建。

