# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|name|string|null: false, add_index: true|
|email|string|false, unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :chat_groups, through: groups_users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|strings|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :groups_users
- has_many :users, through: groups_users
- has_many :messages


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
