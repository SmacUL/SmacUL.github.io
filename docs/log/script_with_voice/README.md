# 字幕音频视频生成器

我将在下文中 BB 一个字幕音频视频的生成器的编写过程. 生成器读取台词后, 利用 Google Text-to-Speech 生成音频, 利用 PIL 以及 opencv 生成字幕视频, 最终输出所有台词的音视频. 像下面这样.

![](/note/img/2020-07-30-23-17-12.png)

最初考虑是一次性代码, 写的比较急, 而且任务适配性不高, 做个参考, 看看就成, 希望能帮到你. [GitHub 仓库](https://github.com/SmacUL/ScrpitVideoCreator)

## 为什么会有这个东西?

万恶之源是老板的一个任务. 老板希望我能够为公司教学平台中的所有实验录制一段演示视频, 这些视频大概 5~15 分钟, 并且要有人工合成的配音, 还要有对应的字幕. 

最初的最初, 我采用纯手工的方式, 先编写剧本台词, 再利用钉钉直播录制视频, 然后使用讯飞一句一句地生成台词音频 (抠门, 没办法全部合成), 最后将所有视频资源导入到 Pr 中剪辑. 一开始我总是要花很多时间先找到指定的音频, 然后找准插入音频的位置, 然后再在音频的位置加上对应长度的字幕, 最后还要再将视频, 音频和字幕调整一下. 

如果, 如果我能用脚本, 利用预先编写好的台词 (本质上就是字幕), 帮我自动合成一段视频, 它包括了字幕音频以及对应长度的字幕视频. 这样, 我在 Pr 中实际处理的就是两段视频资源, 而不是一段视频资源和几十段音频. 剩下的事情就是对字幕视频进行裁切, 将片段位置放好即可. 

一开始一个 10 分钟左右的视频大概需要 4 小时, 现在被压缩到了 2 小时左右. 

## 大概的思路

总体来说, 我先处理一句台词的视频与音频, 然后将所有台词视音频合成起来. 

#### 获取音频

不是我崇洋媚外, Google 的 API 甩了国内厂商八条街, 不管是读的像不像人, 还是念中文中的英文. Text-To-Speech 你值得拥有, 唯一蛋疼的就是需要信用卡. 
#### 生成字幕视频

我们都知道视频本质上可以是连续的图片. 我的想法也是先将文字写在背景图片上, 然后依据音频长度和每秒帧数计算图片数量, 合成指定长度的视频. 
#### Duang, 合成

将音频和视频合成在一起. 
#### 再 Duang, 最终的产物

按顺序将所有的台词视音频连在一起. 


## 音频

### Google Text-To-Speech API

[官网](https://cloud.google.com/text-to-speech)

官网的[快速操作](https://cloud.google.com/text-to-speech/docs/quickstart-client-libraries)已经写得很妙了, 准备好一张信用卡照做就成. 

这个 API 看起来和 MySQL 数据库的连接操作很像, 都需要先起一个客户端. 

``` py {4}
client = texttospeech.TextToSpeechClient()
synthesis_input = texttospeech.SynthesisInput(text=script)
voice = texttospeech.VoiceSelectionParams(
    language_code="cmn-CN", name="cmn-CN-Wavenet-A", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
)
audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3
)
response = client.synthesize_speech(
    input=synthesis_input, voice=voice, audio_config=audio_config
)
with open(outputPath, "wb") as out:
    out.write(response.audio_content)
    print('音频已写入文件 ', outputPath)
```

加黑的位置有一个参数 `name`, 它被设置成 `cmn-CN-Wavenet-A`, 使用 WaveNet 生成普通话音频, 这是 Google 的一项技术, 就是可以让机器话说的更像一个人. 反正我网上兜了一圈, 还没有哪个机器中文说的有她好的. 当然使用 WaveNet 生成音频价格更高. 

利用这段代码, 我们能够获得一段 mp3. 

::: tip 关于 API 的身份验证
很重要的一点, 由于需要添加 `GOOGLE_APPLICATION_CREDENTIALS` 变量进行身份验证, 请使用添加有此变量的命令行窗口运行代码. 不要直接使用 IDE 或者 Code Runner 啥的. 
:::

### 获取音频长度

librosa 工具包可以完成这个任务. 

`pip install librosa`  
`import librosa`

``` py
duration = librosa.get_duration(filename=audioPath)
```

## 字幕

### 生成字幕图片

我需要的字幕尺寸为 1280px * 80px, 黑色背景, 白色的字, 字幕水平居中即可.

老实说, 我没怎么看懂下面代发中的两个方法的操作, 我也是抄来的 :). 总的来说, 就是他们就是用来计算字幕长度的.

``` py
def get_str_width(string):
    width = 0
    for c in string:
        width += get_width(c)
    return width


def get_width(c):
    widths = ((126, 1), (159, 0), (687, 1), (710, 0), (711, 1), (727, 0), (733, 1), (879, 0), (1154, 1), (1161, 0),
              (4347, 1), (4447, 2), (7467, 1), (7521, 0), (8369, 1), (8426, 0), (9000, 1), (9002, 2), (11021, 1),
              (12350, 2), (12351, 1), (12438, 2), (12442, 0), (19893, 2), (19967, 1), (55203, 2), (63743, 1),
              (64106, 2), (65039, 1), (65059, 0), (65131, 2), (65279, 1), (65376, 2), (65500, 1), (65510, 2),
              (120831, 1), (262141, 2), (1114109, 1))
    o = ord(c)
    if o == 0xe or o == 0xf:
        return 0
    for num, wid in widths:
        if o <= num:
            return wid
    return 1
```

利用强大的 PIL 库, 我们可以实现很多 PS 的功能. 

`pip install Pillow-PIL`  
`from PIL import ImageFont, ImageDraw, Image`

``` py
# 这里使用了微软雅黑作为字体的字体. 
font = ImageFont.truetype('./fonts/msyh.ttc', fontSize)
# 创建一张指定长宽的黑色图片
img = Image.new('RGB', (imgW, imgH), (0, 0, 0))
draw = ImageDraw.Draw(img)
# 将白色文字写到图片中, get_str_width 方法在上文中介绍过
# 竖直居中就偷懒不做了
draw.text(((imgW - get_str_width(script) * fontSize / 2) / 2, 23), script, (255, 255, 255), font=font)
img.save(outputPath, 'png')
```

### 化图片为视频
这事交给 opencv 来完成. 

`pip install opencv-python`  
`import cv2`

``` py
# 'm', 'p', '4', 'v' 指定了输出 mp4 格式的视频
video = cv2.VideoWriter(outputPath, cv2.VideoWriter_fourcc('m', 'p', '4', 'v'), fps, size)
# 读取字幕图片
img = cv2.imread(imagePath)
# 帧数 * 时间 = 图片总数
for i in range(int(fps*time)):
    video.write(img)
video.release()
cv2.destroyAllWindows()
```

## Duang 合成

### 合成单句台词的音频与视频

`pip install moviepy`  
`from moviepy.editor import *`

``` py
# videoPath 为视频文件的位置
video = VideoFileClip(videoPath)
# audioPath 为音频文件的位置
audio = AudioFileClip(audioPath)
video = video.set_audio(audio)
# clipPath 为输出的视频文件的位置
# 我的 clipPath 指明了是 mp4 的文件, 不知道其他格式行不行
video.write_videofile(clipPath)
```

### 合成所有音视频

`pip install moviepy`  
`from moviepy.editor import *`

``` py
videos = []
# 我在处理单句字幕音视频的时候, 输出的都是 0.mp4, 1.mp4 .
for i in range(num):
    os.path.join('./clip', str(i) + '.mp4')
    video = VideoFileClip(os.path.join('./clip', str(i) + '.mp4'))
    videos.append(video)
# 合成列表中的音视频
fileVideo = concatenate_videoclips(videos)
# 生, fps 为帧数
fileVideo.to_videofile(outputPath, fps=20, remove_temp=False)
```