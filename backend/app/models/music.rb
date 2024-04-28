class Music < ApplicationRecord
  has_many :music_purchases, dependent: :destroy
  has_many :users, through: :music_purchases
  has_many :playlist_musics, dependent: :destroy
  has_many :playlists, through: :playlist_musics

  def serializable_hash(options = nil)
    options ||= {}
    super(options.merge({
                          methods: [:ref],
                          except: [:is_default, :created_at, :updated_at]
                        }))
  end

  def ref
    nil
  end
end
