class Wallpaper < ApplicationRecord
  has_many :wallpaper_purchases, dependent: :destroy
  has_many :users, through: :wallpaper_purchases

  def serializable_hash(options = nil)
    options ||= {}
    super(options.merge({except: [:is_default_solo, :is_default_multi, :created_at, :updated_at]}))
  end
end
