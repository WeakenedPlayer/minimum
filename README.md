# ScreenshotBot
Discord.js を使って、テキストチャネルに画像を投稿するDiscord用のBotです。NSとありますが、Nanite Systemsとは無関係なので、DBGに怒られたら名前を変えます…(もっとも、使う人はそんなにいないだろうけど)

[![](http://img.youtube.com/vi/IEAlmEk4Fds/0.jpg)](https://www.youtube.com/watch?v=IEAlmEk4Fds)

## 使い方
### 準備
「[DiscordのBotを作る](https://weakenedfuntimeblog.wordpress.com/2017/07/23/discord%e3%81%aebot%e3%82%92%e3%81%a4%e3%81%8f%e3%82%8b/)」を参考に、DiscordのBotを作成します。(BotとはDiscord上での発言や受け答えをするための、Discord上のユーザのようなものです)

作成したBotは、Discordのサーバに登録することで、スクリーンショットを投稿できるようになります。Botのサーバへの登録は、サーバのオーナーにしかできないので、「クライアントID」をオーナーに伝えて、登録してもらってください。

1. Botを作成・設定する
2. Botをチャネルに登録する

### スクリーンショットの投稿
1. *オフライン画面* で、*Source directory*、*Temporary directory*、*Discord token*を指定する。
2. ログインする。
3. *Select channel*からスクリーンショットの投稿先を指定する。
4. *Activate Broadcast*で、スクリーンショットの投稿を開始する。
5. *Source directory*に指定したディレクトリに、スクリーンショット(*.png) が追加されると、JPEGに変換後のスクリーンショットが投稿される。
6. *Deactivate Broadcast* でスクリーンショットの投稿を停止する。
7. *Quit* で終了する。

### 設定の保存
このソフトは、正常終了すると設定が保存されます。設定は以下に保存されます。

``` sh
C:\users\<ユーザ名>\.config
```
### 強制終了
エラー処理をしっかり作りこんでいないため、色々と問題が起こる可能性があります。
その場合は、コンソールで*ctrl + c*を入力すれば強制終了できます。

### 注意
#### Botが勝手に登録される
Botは元々、不特定多数のひとに自動的に情報を発信したり、会話をしたりするためのものなので、Botが知らないサーバに勝手に登録されることは起こり得ます。
まずは、クライアントID(サーバに登録してもらうときに必要)を知られないことが第一です。

万一、知らない人のサーバに勝手に登録されてしまったとしても、スクリーンショットの投稿先にしなければ大丈夫です。
(今後、サーバからの脱退機能を追加予定です)

#### クライアントIDとトークンの管理
* クライアントID: サーバのオーナーに伝える情報…不特定多数の人に伝えないこと。
* トークン: 絶対に知られてはいけない情報…Botを乗っ取られて、なりすましされるかもしれません。定期的に[DiscordのMy Apps](https://discordapp.com/developers/applications/me/)から再設定すべきです。


## 画面の説明
### オフライン画面
* Login: ログイン(Discordに接続)する。
* Source directory: スクリーンショット(PNGファイルのみ) が保存されるディレクトリを指定する。
* Temporary directory: JPEGに変換したスクリーンショットを保存するディレクトリを指定する。
* Discord token: 接続先のDiscord Appの token(トークン文字列)を指定する。
* Quit: 終了する。

![オフライン画面](https://github.com/WeakenedPlayer/minimum/raw/master/images/offline.png)

### オンライン画面
* Activate/Deactivate Broadcast: スクリーンショットの投稿を有効化する/無効化する(交互に切り替わる)。
* Select channel: スクリーンショットを投稿する先のテキストチャネルを指定する。
* Logout: ログアウト(Discordとの接続を解除)する。
* Quit: 終了する。

![オンライン画面](https://github.com/WeakenedPlayer/minimum/raw/master/images/online.png)


## ビルド
ビルドが少しより便利にしたい方がいたら、以下を参考にしてください。

* Visual Studio 2010(?) 以上をインストールする。
* python 2.x 系をインストールし、PATHを設定する。(3.x系だとNG)
* npm install で必要なモジュールを入手する。
* node_modules 内のコードを一部修正する: "Acorn error: Octal literal in strict mode" を防ぐために必要。
* npm run release: nodeをダウンロードしてビルドするので時間がかかる。

### コード修正
node_modulesに含まれるモジュールには、コンソールで特殊な操作を行うための制御文字を8進数で表現している場合があります。
8進数は「strict mode」で禁止されているので、nexeで「Acorn error: Octal literal in strict mode」というエラーが発生して、ビルドできなくなってしまいます。

これを防ぐために、テキストエディタ等(できればEclipse)で、文字列リテラルに含まれる8進数を検索し、16進数に置き換えます。

今のところ、"\033" = "\x1b" = 27 が数か所あるだけだったので手修正しました。(今後ツールが現れたら使いたいです)

#### 修正前

```js
module.exports = function(clear) {
    if (clear !== false) {
        process.stdout.write('\033[2J');
    }
    process.stdout.write('\033[0f');
};
```

#### 修正前

```js
module.exports = function(clear) {
    if (clear !== false) {
        process.stdout.write('\x1b[2J');
    }
    process.stdout.write('\x1b[0f');
};
```

## TODO
* (node:****) ExperimentalWarning: The http2 module is an experimental API. 対策
	* [環境変数「NODE_NO_HTTP2」を 1 にすれば解決する](https://github.com/nodejs/node/pull/15685)ものの、起動前に設定する必要がありそう。
* サーバからの離脱機能
	* クライアントIDを知っている人ならだれでも追加できてしまうので、意図しないサーバからBotを離脱できるようにしたい。
* リファクタリング
	* 画面の機能にロジックが入り混じってぐちゃぐちゃなので、何とかしたい。
* アプリケーション情報の追加
	* Explorerのプロパティで表示される情報を、node.jsから変更したい。(nexeのrcオプションがうまく機能していない?)
* エラー処理
	* どんなエラーがあるか情報を集め、処理を追加する。
* ビルドの改善
	* .node ファイルとdll を自動で収集できるようにする。
	* .node ファイルはできればバンドルできるようにする。
* 操作の改善
	* BotとのDMでリモート操作できるようにする。
	* 複数の設定を簡単に切り替えられるようにする。

## Licence
[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)