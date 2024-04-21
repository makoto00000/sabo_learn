# オンライン自習室アプリ Sabo Learn（サボラーン）

## 概要

- 学生、社会人などテストや資格取得に向けて勉強しなければならない人。
- 自宅で１人で勉強をしていても、ついサボってしまう。
- カフェやコワーキングスペースなどは、お金がかかるので毎日通うのは難しい。

このような方々に、「サボらない自習環境」を提供するアプリ。

リンク: [Sabo Learn（サボラーン）](https://app.sabolearn.com)
![sabolearn_eyecatch](https://github.com/makoto00000/sabo_learn/assets/65654634/be9f8710-4915-4636-9d13-c1295802646a)

## 使用技術

- Backend: Rails ( API mode / Rspec / rubocop ) + Nginx
- Frontend: Next.js ( eslint / prettier )
- Socket Server: Node.js, socket.io
- Infra: AWS ( Amplify / ECS Fargate / ECR / RDS / ALB / Route53 ), Docker & docker-compose

### Backend (Rails + Nginx)

主要gem

- `jwt`: jwt認証を実装するため。発行したtokenをfront側へ送りcookieにセットする。このtokenをbackend側で検証することで、ログイン状態を判定する。
- `rubocop`: Rubyの静的コード解析。
- `rspec-rails`: テスト用フレームワーク。
- `factory_bot_rails`: テスト用のダミーデータを作成。
- `database_cleaner`: テスト実行時にデータベースを初期化する。
- `pry-rails`: デバッグツール。

### Frontend (Next.js)

主要ライブラリ

- `ress`: リセットCSSを簡便に記述できる。
- `sass`: cssをscssで記述するため。
- `dnd-kit`: ドラッグ&ドロップでの並び替え機能を実装するため。
- `react-countup`: カウントアップアニメーションを簡単に実装できる。
- `socket.io-client`: socket.ioを利用するため。

### Socket Server (Node.js / Socket.io)

主要ライブラリ

- `nodemon`: コードの変更時に自動でサーバーを再起動してくれる。
- `socket.io`: サーバーとクライアントの間のリアルタイム通信を行うため。WebRTCでsdp/candidateを交換する目的で導入。

### Infra

`Docker/docker-compose`

開発環境（front, backend, SocketServer, MySql）を全てDockerコンテナで構築。backendは、AWS ECS(Fargate)へのコンテナデプロイのため、サーバー構築が不要で、拡張にも対応できる。

`AWS`

利用サービス

- `ECS (Fargate)`: コンテナ向けサーバーレスコンピューティングエンジン。この中に Rails / Nginx の Dockerイメージを入れて稼働。
- `ECR`: Rails/Nginxと、SocketServerのDockerイメージを保存。
- `RDS (MySQL)`: AWS が用意しているスケーラブルなデータベースエンジン。冗長化によってシステムの可用性を高めるためMultiAZ構成を採用。
- `ALB`: 負荷分散を担うロードバランシングサービス。２つのRails/Nginxタスクへ負荷分散を行っている。
- `Route53`: サイトの独自ドメイン化に使用。アプリケーション、API、Socketサーバー用にそれぞれサブドメインを作成。
- `ACM`: サイトの https 化に使用。
- `Amplify`: FrontのNext.jsをデプロイするために使用。簡易的にデプロイが可能で、githubと連携した自動デプロイも導入。
- `CloudWatch`: エラーを監視し、`SNS`,`ChatBot`経由でSlackへ通知。

## ER 図

![ER図](https://github.com/makoto00000/sabo_learn/assets/65654634/d3c3aa17-a9dc-4334-8e45-ab1aa7709412)

## インフラ構成図

![インフラ構成図](https://github.com/makoto00000/sabo_learn/assets/65654634/de75ef3c-dbcb-40e3-8c32-14eed87d46a6)

## 機能一覧

### ユーザー利用機能

#### ログイン機能

- googleアカウントを利用したユーザー登録（OAuth認証）

#### 自習室機能

- 滞在時間に応じてコインが付与される
- オーディオプレイヤーで音楽を再生できる
- 動体検知カメラによりユーザーのサボりを判定（サボり判定中は時間が止まる）
- （マルチ部屋の場合）最大4人までのビデオ映像が画面に表示される

#### ショップ機能

- 獲得したコインを消費して、背景画像、音楽を購入することができる

#### 設定機能

- ソロ部屋、マルチ部屋それぞれに、購入した背景画像を設定することができる
- 購入した音楽からプレイリストを作成し、オーディオプレイヤーで再生できる

#### UI

- プレイリストはドラッグ&ドロップで作成。曲順も設定可能
- スマホ（縦横両方）、タブレットへのレスポンシブ対応

#### セキュリティ

- フロント側のログイン機能はNext Authで実装
- ログインのjwt tokenを、cookieとしてHttp Only属性と、Secure属性を付与して保存
- APIへのリクエストを行うfetch関数は、すべてサーバー側で行うため、リクエスト情報は公開されない
- Socket Server、RailsにはCORS設定を行い、アクセスできるオリジンを制限
- AWSでは、ECS、RDS、ALBそれぞれセキュリティグループを設定し、必要なアクセスのみを許可
- ビデオカメラにはモザイク処理をかけてプライバシーに配慮。WebRTCに乗せるビデオは、モザイク化したビデオを一度canvas化し、再度ビデオに変換することで、モザイク除去できない仕組み

### ユーザー非利用機能

- 開発環境はDockerによりコンテナ化
- Socket Serverを使用してリアルタイムにsdp / candidateを交換
- github actionsで自動テスト実行（Rspec、rubocop, ESLint）
- frontendは、Amplifyによる自動デプロイ
- backend, socket serverは、github actionsで自動デプロイ（それぞれのディレクトリで差分を検知したとき）
- CloudWatchでエラーを監視し、Slackへ通知

## アップデート予定（追加したい機能）

- 追加機能
  - ホワイトノイズ、環境音、雑音などのBGMを追加
  - SHOPにソート機能、タグ検索を追加
  - ビデオのフレームを購入
  - 休憩室機能
  - ポモドーロタイマー
  - フレンド機能
  - ランキング機能
  - 学習時間を記録しグラフ化
  - 他人の学習時間を見える化
  - ビデオではなくバーチャルキャラ化 + アバター購入
  - 目標設定機能（他人の目標も見られる）

- マッチングにロジック追加
  - ユーザータイプを診断し、それに応じてマッチング

- ボーナスコイン
  - 朝型夜型診断とボーナスコイン
  - スマホ連携によりコイン獲得量アップ
  - 勉強時間に応じてボーナスコイン獲得
  - マルチルームは人数によってボーナスコイン
