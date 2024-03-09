# リリース計画 Sprint 1

以下の機能を満たすアプリを作成しリリースする。

## 機能要件

### 画面遷移

- [x] <https://localhost:4000>にアクセスすると、room選択画面が表示される
- [x] 「Solo Room」を選択すると、Solo Roomの画面が表示される
- [x] Exitを押すと、room選択画面に戻る

### Solo Room

- [x] カメラが起動し、画面中央にモザイクのかかった映像が表示される
- [x] 30秒動きがなければ、映像の枠が赤くなり、映像の下に「Sabo？」と表示され、タイマーはストップする
- [x] 30秒以内に動きがあれば、映像の枠は緑のままで、映像の下には「Studying」と表示される

### 音楽プレイヤー

- [x] 再生ボタンを押すと音楽が再生される
- [x] スキップボタンを押すと次/前の曲が再生される
- [x] リピートボタンを押すと、1曲リピート再生、全曲リピート再生に切り替わる
- [x] シャッフルボタンを押すと、ランダムに再生される（同じ曲は再生されない→そのためユーザーの持ち曲が1曲しかないと無限ループになるが、初期状態で3曲持っているようにするため、問題なし）
- [x] 曲のタイトルが9文字より多いまたは、アーティスト名が15文字より多い場合、スクロールアニメーションが発動する

### ログイン機能

- [ ] メールアドレス、パスワードで会員登録ができる
- [ ] googleアカウントでログインができる
- [ ] メールアドレス、パスワードにバリデーションチェックを行う
- [ ] パスワードリセット用の処理を追加する
- [ ] 入力された情報をUsersテーブルに保存する
- [ ] 保存したUsersテーブルの情報をフロント側で取得する

## 非機能要件

- 開発環境
  - フロントエンド: Next.js 14.1（React 18）
  - バックエンド: Ruby on Rails 3.2.2
  - データベース: Mysql
- CI/CD
  - developブランチにプルリクエストすると、自動テストが実行される
  - mainブランチにマージされると、自動デプロイされる

## 設計

### 業務フロー

![sabolearn_flow](https://github.com/makoto00000/sabo_learn/assets/65654634/28529e8a-60e3-44bc-87d5-f3ae9a6a6e8e)

### 画面遷移図 / ワイヤーフレーム

![wire-frame](https://github.com/makoto00000/sabo_learn/assets/65654634/676f2de2-b7da-4033-846c-279dd5144be4)

### テーブル定義書（もしくは ER 図）

| カラム名        | 意味                 | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :-------------- | :------------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id              | ユーザーID           | bigint   | ◯   |      | ◯        | ◯   |         |
| name            | ユーザー名           | string   |      |      | ◯        |      |         |
| email           | メールアドレス       | string   |      |      | ◯        | ◯   |         |
| password_digest | ハッシュ化パスワード | string   |      |      | ◯        |      |         |
| birthday        | 誕生日               | date     |      |      | ◯        |      |         |
| point           | ポイント             | int      |      |      | ◯        |      | 0       |
| created_at      | 作成日時             | datetime |      |      | ◯        |      |         |
| updated_at      | 更新日時             | datetime |      |      | ◯        |      |         |

### システム構成図

作成中