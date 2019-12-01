class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validetes :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end
