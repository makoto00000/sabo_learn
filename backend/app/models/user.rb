# frozen_string_literal: true

class User < ApplicationRecord

  has_many :music_purchases, dependent: :destroy
  has_many :musics, through: :music_purchases
  has_many :wallpaper_purchases, dependent: :destroy
  has_many :wallpapers, through: :wallpaper_purchases
  has_one :playlist, dependent: :destroy
  belongs_to :solo_wallpaper, class_name: 'Wallpaper', optional: true
  belongs_to :multi_wallpaper, class_name: 'Wallpaper', optional: true


  before_save :downcase_email
  has_secure_password validations: false

  # validates :name, presence: true, length: { maximum: 10 }
  validates :name, presence: true

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, uniqueness: true # rubocop:disable Rails/UniqueValidationWithoutIndex

  VALID_PASSWORD_REGEX = /\A[a-zA-Z]+[0-9#?!&]+\z|\A[0-9#?!&]+[a-zA-Z]+\z/
  validates :password, presence: true, length: { minimum: 10 }, format: { with: VALID_PASSWORD_REGEX }, allow_nil: true, unless: :from_provider?

  def from_provider?
    uid.present?
  end

  def as_json(options = {})
    super(options.merge({
                          include: {
                            musics: {
                              only: [:ref]
                            }
                          }
                        }))
  end

  private

  def downcase_email
    email.downcase!
  end
end
