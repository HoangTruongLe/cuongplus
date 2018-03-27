class Admins::RoomsController < ApplicationController
  before_action :find_room, only: [:clicked]

  def clicked
    if @room
      @months = @room.clicking_month_details
      @clickings = {
        years: @room.clicking_year_details,
        months: @months,
        days: parse_date
      }
      @uuid_room = SecureRandom.uuid
    end
  end

  private
    def parse_date
      all_day = parse_days_month
      clickings_date = @room.clicking_date_details
      all_day.each_with_index do |a, i|
        clickings_date.each do |d|
          if a[:day] == d.date.day && a[:month] == d.date.month && a[:year] == d.date.year
            all_day[i][:count] = d.count
          end
        end
      end
    end

    def parse_days_month
      days = []
      @months.each do |m|
        days_in_month = Time.days_in_month(m.month, m.year) - 1
        days_in_month.times do |t|
          days << {day: t + 1, month: m.month, year: m.year, wday: weekdays(Date.new(m.year, m.month, t+1)), count: 0}
        end
      end
      days
    end

    def find_room
      @room = Room.find_by_id(params[:id])
    end
end
