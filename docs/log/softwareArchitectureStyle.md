# 软件体系结构风格实践

## 典型的软件体系结构是什么

说的应该是这四种：

- 主/子程序体系架构风格 KP130

    这种体系架构将程序分解为一个控制层次。“主程序”也就是控制程序，调用一系列“子程序”，包括子控制程序和子应用程序。

    图 6-14 给出了一个例子

- 面向对象体系架构风格

    在这种模式下数据的表示和基本的操作都被封装在一个抽象数据类型或对象中。

- 管道过滤体系架构风格 KP120

    系统运行时组织的模型，数据从一个处理单元流动到另一个处理单元，数据在每个单元都得到加工，并传给相应的单元。

    图 6-5 给出了一个例子

- 事件过程调用体系架构风格

    通过发布或广播一个或者多个事件，并注册系统中的其他构件与这些事件绑定起来，表示对某一事件感兴趣。

## 用四种典型的体系结构实现一个使用系统

这个系统是 KWIC 关键词索引系统。每一行是单词的有序集合，每个单词是字母的有序集合。KWIC检索系统以字母表的顺序输出一个所有行循环移动的列表。

即让所有输入的行内容进行行内单词循环移动，得到 行数 * 单词数 个不同的行结果，并且按照字母表的顺序将这些行结果进行排序。

程序包括 输入 分词 移动 重组 排序 输出 四大部分

处理结束之后添加注释

## KWIC 上下文关键词索引

## 可用资料

[一份疑似的实验报告](https://www.cnblogs.com/zzl1/p/7867542.html)


## 代码

1. 主子程序

``` java
package mainson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class MainSon {

    public static void main(String[] args) throws IOException {
        String message = inputFunc();
        String[] words = divideFunc(message);
        String[] results = new String[words.length];
        for (int i = 0; i < words.length; i++) {
            words = moveFunc(words);
            results[i] = regroupFunc(words);
        }
        String[] sortedResult = sortFunc(results);
        outputFunc(sortedResult);
    }

    /**
     * 输出
     * @param message
     */
    private static void outputFunc(String[] message) {
        for (int i = 0; i < message.length; i++) {
            System.out.println(message[i]);
        }
    }

    /**
     * 对信息数组的内容进行排序
     * @param messages
     * @return
     */
    private static String[] sortFunc(String[] messages) {
        Arrays.sort(messages);
        return messages;
    }

    /**
     * 调整句子中单词的位置
     * @param words
     * @return
     */
    private static String[] moveFunc(String[] words) {
        String firstWord = words[0];
        for (int i = 1; i < words.length; i++) {
            words[i - 1] = words[i];
        }
        words[words.length - 1] = firstWord;
        return words;
    }

    /**
     * 重组单词成句
     * @param words
     * @return
     */
    private static String regroupFunc(String[] words) {
        String sb = "";
        for (int j = 0; j < words.length; j++) {
            sb += words[j];
            sb += " ";
        }
        return sb;
    }

    /**
     * 将句子切分成单词
     * @param message
     * @return
     */
    private static String[] divideFunc(String message) {
        String[] words = message.split(" ");
        return words;
    }

    /**
     * 输入
     * @return
     * @throws IOException
     */
    private static String inputFunc() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = null;
        System.out.println("Enter your value:");
        str = br.readLine();
        return str;
    }

}

```

2. 面向对象

一个中心 main 函数，两个接口，两个实现类

``` java
package oop;

import java.io.IOException;

public class MainTest {

    public static void main(String[] args) throws IOException {
        MessageHandler mh = new MessageHandlerImpl();
        InputOutputHandler ioh = new InputOutputHandlerImpl();

        String message = ioh.inputFunc();
        String[] words = mh.divideFunc(message);
        String[] results = new String[words.length];
        for (int i = 0; i < words.length; i++) {
            words = mh.moveFunc(words);
            results[i] = mh.regroupFunc(words);
        }
        String[] sortedResult = mh.sortFunc(results);
        ioh.outputFunc(sortedResult);

    }

}

```

``` java
package oop;

import java.io.IOException;

public interface InputOutputHandler {

    void outputFunc(String[] message);

    String inputFunc() throws IOException;

}
```

``` java
package oop;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class InputOutputHandlerImpl implements InputOutputHandler {
    @Override
    public void outputFunc(String[] message) {
        for (int i = 0; i < message.length; i++) {
            System.out.println(message[i]);
        }
    }

    @Override
    public String inputFunc() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = null;
        System.out.println("Enter your value:");
        str = br.readLine();
        return str;
    }
}

```

``` java
package oop;

public interface MessageHandler {

    String[] sortFunc(String[] messages);

    String[] moveFunc(String[] words);

    String regroupFunc(String[] words);

    String[] divideFunc(String message);

}
```

``` java
package oop;

import java.util.Arrays;

public class MessageHandlerImpl implements MessageHandler {

    @Override
    public String[] sortFunc(String[] messages) {
        Arrays.sort(messages);
        return messages;
    }

    @Override
    public String[] moveFunc(String[] words) {
        String firstWord = words[0];
        for (int i = 1; i < words.length; i++) {
            words[i - 1] = words[i];
        }
        words[words.length - 1] = firstWord;
        return words;
    }

    @Override
    public String regroupFunc(String[] words) {
        String sb = "";
        for (int j = 0; j < words.length; j++) {
            sb += words[j];
            sb += " ";
        }
        return sb;
    }

    @Override
    public String[] divideFunc(String message) {
        String[] words = message.split(" ");
        return words;
    }
}

```


3. 管道过滤
   
``` java
package pipe;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Pipe {

    public static void main(String[] args) throws IOException {
        /*
        输入
         */
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = null;
        System.out.println("Enter your value:");
        str = br.readLine();

        /*
        分词
         */
        String[] words = str.split(" ");

        String[] results = new String[words.length];
        for (int k = 0; k < words.length; k++) {
            /*
            移动
             */
            String firstWord = words[0];
            for (int i = 1; i < words.length; i++) {
                words[i - 1] = words[i];
            }
            words[words.length - 1] = firstWord;

            /*
            重组
             */
            String sb = "";
            for (int j = 0; j < words.length; j++) {
                sb += words[j];
                sb += " ";
            }

            results[k] = sb;
        }

        /*
        排序
         */
        Arrays.sort(results);

        /*
        输出
         */
        for (int i = 0; i < results.length; i++) {
            System.out.println(results[i]);
        }

    }

}

```

4. 事件调用

main 函数中添加事件调度机制

``` java
package event;


import java.io.IOException;

public class EventTest {

    public static void main(String[] args) throws IOException {
        String message = (String)requestHandler("input", null);
        String[] words = (String[]) requestHandler("divide", message);
        String[] results = new String[words.length];
        for (int i = 0; i < words.length; i++) {
            words = (String[]) requestHandler("move", words);
            results[i] = (String) requestHandler("regroup", words);
        }

        String[] sortedResult = (String[]) requestHandler("sort", results);
        requestHandler("output", sortedResult);
    }

    private static Object requestHandler(String event, Object param) throws IOException {
        InputOutputResponder ior =new InputOutputResponder();
        MessageResponder mr = new MessageResponder();
        if (event.equals("input")) {
            return ior.inputFunc();
        } else if (event.equals("divide")) {
            return mr.divideFunc((String) param);
        } else if (event.equals("move")) {
            return mr.moveFunc((String[]) param);
        } else if (event.equals("regroup")) {
            return mr.regroupFunc((String[]) param);
        } else if (event.equals("sort")) {
            return mr.sortFunc((String[]) param);
        } else if (event.equals("output")) {
            ior.outputFunc((String[]) param);
        }
        return null;
    }

}

```

两个事件处理类

``` java
package event;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class InputOutputResponder {

    public void outputFunc(String[] message) {
        for (int i = 0; i < message.length; i++) {
            System.out.println(message[i]);
        }
    }

    public String inputFunc() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = null;
        System.out.println("Enter your value:");
        str = br.readLine();
        return str;
    }

}

```

``` java
package event;

import java.util.Arrays;

public class MessageResponder {

    public String[] sortFunc(String[] messages) {
        Arrays.sort(messages);
        return messages;
    }

    public String[] moveFunc(String[] words) {
        String firstWord = words[0];
        for (int i = 1; i < words.length; i++) {
            words[i - 1] = words[i];
        }
        words[words.length - 1] = firstWord;
        return words;
    }

    public String regroupFunc(String[] words) {
        String sb = "";
        for (int j = 0; j < words.length; j++) {
            sb += words[j];
            sb += " ";
        }
        return sb;
    }

    public String[] divideFunc(String message) {
        String[] words = message.split(" ");
        return words;
    }
}

```