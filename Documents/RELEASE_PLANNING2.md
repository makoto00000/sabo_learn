# リリース計画 Sprint 2

以下の機能を満たすアプリを作成しリリースする。

## 機能要件

### 画面遷移

- [x] <https://app.sabolearn.com/multiroom>にアクセスするとマルチルームへアクセスできる
- [x] Exitを押すと、room選択画面に戻り、作業時間に応じたコインが付与される

### Multi Room

- [x] カメラが起動し、画面中央にモザイクのかかった映像が表示される
- [x] 30秒動きがなければ、映像の枠が赤くなり、映像の下に「Sabo？」と表示され、タイマーはストップする
- [x] 30秒以内に動きがあれば、映像の枠は緑のままで、映像の下には「Studying」と表示される
- [x] Multi Roomに入った人のビデオカメラの映像が画面に表示される
- [x] 接続相手の映像にもモザイクがかかる
- [x] 最大4人まで表示される
- [x] 退室すると、残った人の画面から映像が消える  

## 非機能要件

- 開発環境
  - シグナリングサーバー: Node.js 21.5 （Socket.io）

## 設計

### 業務フロー

マルチルーム関連のみ

![sabolearn_flow](https://github.com/makoto00000/sabo_learn/assets/65654634/16269d63-f485-492e-9116-5869d61d2802)

### 画面遷移図 / ワイヤーフレーム

![wire-frame](https://github.com/makoto00000/sabo_learn/assets/65654634/5ddd50c0-502b-4bcc-a46b-a685ac189dde)

### テーブル定義書（もしくは ER 図）

内容は前回と変更なし

| カラム名        | 意味                  | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :-------------- | :-------------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id              | ユーザーID            | bigint   | ◯   |      | ◯       | ◯    |         |
| name            | ユーザー名            | string   |      |      | ◯       |       |         |
| email           | メールアドレス        | string   |      |      | ◯       | ◯    |         |
| password_digest | ハッシュ化パスワード  | string   |      |      | ◯       |       |         |
| birthday        | 誕生日                | date     |      |      | ◯       |       |         |
| coin            | コイン                | int      |      |      | ◯       |       | 0       |
| provider        | SNS認証プロバイダー名 | string   |      |      |          |       |         |
| uid             | SNS認証ID             | string   |      |      |          |       |         |
| created_at      | 作成日時              | datetime |      |      | ◯       |       |         |
| updated_at      | 更新日時              | datetime |      |      | ◯       |       |         |

### システム構成図

![インフラ構成図](https://github.com/makoto00000/sabo_learn/assets/65654634/bf91110f-7f6c-4eab-87d2-f21050a86434)
