class UserFavoriteTeamsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    teams = current_user.try(:teams) || []
    render json: teams
  end

  def update_all
    raise unless current_user
    given_team_slugs = params[:teams]
    current_team_slugs = current_user.user_favorite_teams.includes(:team).map(&:team_slug)
    newly_added_team_slugs = given_team_slugs - current_team_slugs
    removed_team_slugs = current_team_slugs - given_team_slugs

    Team.where(slug: newly_added_team_slugs).each do |team|
      current_user.user_favorite_teams.find_or_create_by(team: team)
    end

    Team.where(slug: removed_team_slugs).each do |team|
      current_user.user_favorite_teams.where(team: team).destroy_all
    end

    render json: current_user.user_favorite_teams.map(&:team), status: :created
  end

  # GET /teams/new
  def new
    @team = Team.new
  end

  def create
    new_favorite = current_user.teams.build(team: Team.find_by(slug: params[:team_slug]))

    if new_favorite.save
      render json: new_favorite, status: :created
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @team.destroy
    respond_to do |format|
      format.html { redirect_to teams_url, notice: 'Team was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_team
    @team = Team.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def team_params
    params.require(:team).permit(:name, :league)
  end
end
