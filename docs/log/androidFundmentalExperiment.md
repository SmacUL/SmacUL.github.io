# 安卓基础实验

- Event handle
- Fragment
- Adapter View


## List View

[文档](https://www.jianshu.com/p/0a72276c537f)

首先这个 ListView 是 Android 中最常用的控件之一。这个暂时没有什么太大的问题。

## DialogFragment

[DialogFragment 的介绍](https://www.cnblogs.com/mercuryli/p/5372496.html)

DialogFragment 能够让 dialog 也变成碎片。

## daima

``` xml
<LinearLayout
    android:layout_width="300dp"
    android:layout_height="wrap_content"
    android:orientation="vertical"
    tools:layout_editor_absoluteX="0dp"
    tools:layout_editor_absoluteY="0dp"
    tools:ignore="MissingConstraints">

    <TextView
        android:id="@+id/dialog_title"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="this is title"
        android:theme="@style/titleTheme" />

    <TextView
        android:id="@+id/dialog_content"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="this is content"
        android:theme="@style/contentTheme" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="标题" />
        <EditText
            android:id="@+id/dialog_title_edit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="内容"
            />
        <EditText
            android:id="@+id/dialog_content_edit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
    </LinearLayout>

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center">

        <Button
            android:id="@+id/dialog_remove"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="删除"
            android:layout_gravity="center"
            />
        <Button
            android:id="@+id/dialog_confirm"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="确认"
            />
    </LinearLayout>
</LinearLayout>

```


``` java

package com.example.smacul.comprehensiveexper;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.DialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.smacul.comprehensiveexper.R;
import com.example.smacul.comprehensiveexper.TransMessageService;

public class ItemDialog extends DialogFragment {
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        ··· ···
        // 删除按钮响应逻辑
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ··· ···

                // 向接口中导入数据
                transMessageService.transMessageFromDialogToMain(position, title, content, signal);

                dismiss();
            }
        });
        ··· ···
        return view;
    }

    /**
     * 注入接口
     */
    public void setTransMessageService(TransMessageService transMessageService) {
        this.transMessageService = transMessageService;
    }

}


public interface TransMessageService {

    void transMessageFromDialogToMain(int itemId, String a, String b, String signal);

}
```