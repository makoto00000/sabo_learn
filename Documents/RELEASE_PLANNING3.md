# リリース計画 Sprint 3

以下の機能を満たすアプリを作成しリリースする。

## 機能要件

### 画面遷移

- [x] トップページ <https://app.sabolearn.com> で、サイドメニューのStoreをクリックすると、Storeコンポーネントが表示される
- [x] サイドメニューのSettingをクリックすると、Settingコンポーネントが表示される
- [x] サイドメニューのSettingをクリックすると、Settingコンポーネントが表示される

### Store

- [x] タブで「Background」「Music」を切り替えられる
- [x] アイテム一覧が表示される
- [x] 未購入アイテムをクリックすると確認モーダルが表示される
- [x] 購入ボタンを押すとユーザーの所持アイテムに追加される
- [x] 購入済みアイテムは購入済みと表示されクリックできない

### Setting

- [x] タブで「Background」「Music」を切り替えられる
- [x] Backgroundタブで、現在のSolo/MultiRoomの背景画像が表示される
- [x] 画像をクリックすると、画像選択画面が表示される
- [x] 現在選択中の画像には「選択中」と表示され、選択できないようになっている
- [x] 画像をクリックすると、modalが表示されて、設定をクリックすると、現在の背景画面に戻り、選択結果が反映されている
- [x] Musicタブで、音楽選択画面が表示される
- [x] 購入済みの音楽と、現在のプレイリストが画面に表示される
- [x] プレイリストを設定し、room内では設定したプレイリストが再生される
- [x] プレイリストには必ず1曲以上選択されているようにする

## 設計

### 画面遷移図 / ワイヤーフレーム

![wire-frame](https://github.com/makoto00000/sabo_learn/assets/65654634/faf19077-c2a4-4faf-bbc3-be872836af99)

### テーブル定義書

- usersテーブルに`solo_wallpaper_id`,`multi_wallpaper_id`を追加
- テーブル `musics`,`walpapers`,`music_purchases`,`wallpaper_purchases`,`playlists`,`playlists_musics`を追加

#### users

| カラム名           | 意味                  | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :----------------- | :-------------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id                 | ユーザーID            | bigint   | ◯   |      | ◯       | ◯    |         |
| name               | ユーザー名            | string   |      |      | ◯       |       |         |
| email              | メールアドレス        | string   |      |      | ◯       | ◯    |         |
| password_digest    | ハッシュ化パスワード  | string   |      |      | ◯       |       |         |
| birthday           | 誕生日                | date     |      |      | ◯       |       |         |
| coin               | コイン                | int      |      |      | ◯       |       | 0       |
| provider           | SNS認証プロバイダー名 | string   |      |      |          |       |         |
| uid                | SNS認証ID             | string   |      |      |          |       |         |
| is_new_user        | 新規登録者か          | boolean  |      |      | ◯       |       | true    |
| solo_wallpaper_id  | solo room背景画像     | bigint   |      | ◯   | ◯       | ◯    | 1       |
| multi_wallpaper_id | multi room背景画像    | bigint   |      | ◯   | ◯       | ◯    | 2       |
| created_at         | 作成日時              | datetime |      |      | ◯       |       |         |
| updated_at         | 更新日時              | datetime |      |      | ◯       |       |         |

#### musics

| カラム名   | 意味           | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :--------- | :------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id         | music ID       | bigint   | ◯   |      | ◯       | ◯    |         |
| title      | タイトル       | string   |      |      | ◯       |       |         |
| artist     | アーティスト名 | string   |      |      | ◯       |       |         |
| src        | 保存先のパス   | string   |      |      | ◯       |       |         |
| price      | 価格           | int      |      |      | ◯       |       |         |
| created_at | 作成日時       | datetime |      |      | ◯       |       |         |
| updated_at | 更新日時       | datetime |      |      | ◯       |       |         |

#### walpapers

| カラム名   | 意味           | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :--------- | :------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id         | wallpaper ID   | bigint   | ◯   |      | ◯       | ◯    |         |
| title      | タイトル       | string   |      |      | ◯       |       |         |
| src        | 保存先のパス   | string   |      |      | ◯       |       |         |
| price      | 価格           | int      |      |      | ◯       |       |         |
| created_at | 作成日時       | datetime |      |      | ◯       |       |         |
| updated_at | 更新日時       | datetime |      |      | ◯       |       |         |

#### music_purchases

| カラム名   | 意味              | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :--------- | :---------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id         | music_purchase ID | bigint   | ◯   |      | ◯       | ◯    |         |
| music_id   | music ID          | bigint   |      | ◯   | ◯       | ◯    |         |
| user_id    | user ID           | bigint   |      | ◯   | ◯       | ◯    |         |
| created_at | 作成日時          | datetime |      |      | ◯       |       |         |
| updated_at | 更新日時          | datetime |      |      | ◯       |       |         |

#### wallpaper_purchases

| カラム名     | 意味                  | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :----------- | :-------------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id           | wallpaper_purchase ID | bigint   | ◯   |      | ◯       | ◯    |         |
| wallpaper_id | wallpaper ID          | bigint   |      | ◯   | ◯       | ◯    |         |
| user_id      | user ID               | bigint   |      | ◯   | ◯       | ◯    |         |
| created_at   | 作成日時              | datetime |      |      | ◯       |       |         |
| updated_at   | 更新日時              | datetime |      |      | ◯       |       |         |

#### playlists

| カラム名    | 意味           | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :---------- | :------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id          | playlist ID    | bigint   | ◯   |      | ◯       | ◯    |         |
| user_id     | user ID        | bigint   |      | ◯   | ◯       | ◯    |         |
| name        | プレイリスト名 | string   |      |      | ◯       |       |         |
| music_order | 曲順           | string   |      |      | ◯       |       |         |
| created_at  | 作成日時       | datetime |      |      | ◯       |       |         |
| updated_at  | 更新日時       | datetime |      |      | ◯       |       |         |

#### playlists_musics

| カラム名    | 意味           | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :---------- | :------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id          | playlist ID    | bigint   | ◯   |      | ◯       | ◯    |         |
| playlist_id | user ID        | bigint   |      | ◯   | ◯       | ◯    |         |
| music_id    | music ID       | bigint   |      | ◯   | ◯       | ◯    |         |
| created_at  | 作成日時       | datetime |      |      | ◯       |       |         |
| updated_at  | 更新日時       | datetime |      |      | ◯       |       |         |

### ER図

![ER図](https://github.com/makoto00000/sabo_learn/assets/65654634/d3c3aa17-a9dc-4334-8e45-ab1aa7709412)

### システム構成図

前回から変更なし

![インフラ構成図](https://github.com/makoto00000/sabo_learn/assets/65654634/bf91110f-7f6c-4eab-87d2-f21050a86434)
