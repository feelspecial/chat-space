## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false,unique: true|
|mail|string|null: false|

### Association
- has_many :groups,throuth:groups_users
- has_many :messages  
- has_many :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|

### Association
- has_many :users,throuth:groups_users
- has_many :messages  
- has_many :groups_users

## messegeテーブル

|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|text|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group 
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

