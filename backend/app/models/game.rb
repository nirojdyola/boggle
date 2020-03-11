class Game < ApplicationRecord
    validates :words, presence: true
end
