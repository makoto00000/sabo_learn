# リリース計画 Sprint 4

以下の機能を追加しリリースする。

## 機能要件

### 画面遷移

- [ ] トップページ <https://app.sabolearn.com> で、サイドメニューのRecordをクリックすると、Recordコンポーネントが表示される

### Record

- [ ] 直近1週間分の学習時間のグラフが表示される
- [ ] 今日の学習時間が表示される
- [ ] これまでの総獲得コインが表示される
- [ ] 今週の平均学習時間が表示される
- [ ] 連続ログイン日数が表示される

### Modal

- [ ] 退室後のmodalに今日の合計学習時間を表示
- [ ] AM5時以降の初回アクセス時に、連続ログイン日数を表示するmodalを追加

### その他

- [ ] コーチマークにRecordの説明を追加する

## 設計

### 画面遷移図 / ワイヤーフレーム

![wire-frame4](https://github.com/makoto00000/sabo_learn/assets/65654634/6635d25b-693a-4df9-bc6b-48ab5dd12c21)

### テーブル定義書

- usersテーブルに`total_coin`,`consecutive_login_days`を追加
- study_timesテーブルを追加

#### users

| カラム名               | 意味                  | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :--------------------- | :-------------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id                     | ユーザーID            | bigint   | ◯   |      | ◯        | ◯   |         |
| name                   | ユーザー名            | string   |      |      | ◯        |      |         |
| email                  | メールアドレス        | string   |      |      | ◯        | ◯   |         |
| password_digest        | ハッシュ化パスワード  | string   |      |      | ◯        |      |         |
| birthday               | 誕生日                | date     |      |      | ◯        |      |         |
| coin                   | コイン                | int      |      |      | ◯        |      | 0       |
| provider               | SNS認証プロバイダー名 | string   |      |      |           |      |         |
| uid                    | SNS認証ID             | string   |      |      |           |      |         |
| is_new_user            | 新規登録者か          | boolean  |      |      | ◯        |      | true    |
| total_coin             | 総獲得コイン数        | boolean  |      |      | ◯        |      | 0       |
| consecutive_login_days | 連続ログイン日数      | boolean  |      |      | ◯        |      | 0       |
| solo_wallpaper_id      | solo room背景画像     | bigint   |      | ◯   | ◯        | ◯   | 1       |
| multi_wallpaper_id     | multi room背景画像    | bigint   |      | ◯   | ◯        | ◯   | 2       |
| created_at             | 作成日時              | datetime |      |      | ◯        |      |         |
| updated_at             | 更新日時              | datetime |      |      | ◯        |      |         |

#### study_times

| カラム名   | 意味           | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :--------- | :------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id         | study_times ID | bigint   | ◯   |      | ◯       | ◯    |         |
| study_time | time           | time     |      |      | ◯       |       |         |
| study_date | 学習日         | date     |      |      | ◯       |       |         |
| user_id    | user ID        | bigint   |      | ◯   | ◯       | ◯    |         |
| created_at | 作成日時       | datetime |      |      | ◯       |       |         |
| updated_at | 更新日時       | datetime |      |      | ◯       |       |         |

#### musics

| カラム名   | 意味           | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :--------- | :------------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id         | music ID       | bigint   | ◯   |      | ◯       | ◯    |         |
| title      | タイトル       | string   |      |      | ◯       |       |         |
| artist     | アーティスト名 | string   |      |      | ◯       |       |         |
| src        | 保存先のパス   | string   |      |      | ◯       |       |         |
| price      | 価格           | int      |      |      | ◯       |       |         |
| is_default | default音楽    | boolean  |      |      | ◯       |       | false   |
| created_at | 作成日時       | datetime |      |      | ◯       |       |         |
| updated_at | 更新日時       | datetime |      |      | ◯       |       |         |

#### walpapers

| カラム名         | 意味         | データ型 | PK   | FK   | NOT NULL | INDEX | DEFAULT |
| :--------------- | :----------- | :------- | :--- | :--- | :------- | :---- | :------ |
| id               | wallpaper ID | bigint   | ◯   |      | ◯       | ◯    |         |
| title            | タイトル     | string   |      |      | ◯       |       |         |
| src              | 保存先のパス | string   |      |      | ◯       |       |         |
| price            | 価格         | int      |      |      | ◯       |       |         |
| is_default_solo  | default背景  | boolean  |      |      | ◯       |       | false   |
| is_default_multi | default背景  | boolean  |      |      | ◯       |       | false   |
| created_at       | 作成日時     | datetime |      |      | ◯       |       |         |
| updated_at       | 更新日時     | datetime |      |      | ◯       |       |         |

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

![ER図](https://github.com/makoto00000/sabo_learn/assets/65654634/62dea1a8-9098-465a-816b-48d5dc0ecdf3)

### インフラ構成図

前回から変更なし

![インフラ構成図](https://github.com/makoto00000/sabo_learn/assets/65654634/de75ef3c-dbcb-40e3-8c32-14eed87d46a6)

### 使用ライブラリ

[Recharts](https://recharts.org/en-US)
