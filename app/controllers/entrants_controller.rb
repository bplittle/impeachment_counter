class EntrantsController < ApplicationController
  before_action :set_entrant, only: [:show, :edit, :update, :destroy]

  # GET /entrants
  # GET /entrants.json
  def index
    @entrants = Entrant.all
  end

  # GET /entrants/1
  # GET /entrants/1.json
  def show
  end

  # GET /entrants/new
  def new
    @entrant = Entrant.new
  end

  # GET /entrants/1/edit
  def edit
  end

  # POST /entrants
  # POST /entrants.json
  def create
    mod_params = entrant_params
    date = entrant_params[:date].to_datetime
    begin
      raise "Date must be in the future" if date <= DateTime.now
      raise "Date must be in this term" if date >= Date.new(2020, 11, 3)
      date = date.change(hour: params[:time].split(':')[0].to_i, minute: params[:time].split(':')[1].to_i)
      mod_params[:guess] = date
      mod_params.delete('date')
      mod_params.delete('time')
      @entrant = Entrant.create(mod_params)
    rescue => e
      render json: {message: e.message}, status: 500
    else
      render json: {entrant: @entrant}, status: 200
    end
  end

  # PATCH/PUT /entrants/1
  # PATCH/PUT /entrants/1.json
  def update
    respond_to do |format|
      if @entrant.update(entrant_params)
        format.html { redirect_to @entrant, notice: 'Entrant was successfully updated.' }
        format.json { render :show, status: :ok, location: @entrant }
      else
        format.html { render :edit }
        format.json { render json: @entrant.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /entrants/1
  # DELETE /entrants/1.json
  def destroy
    @entrant.destroy
    respond_to do |format|
      format.html { redirect_to entrants_url, notice: 'Entrant was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entrant
      @entrant = Entrant.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def entrant_params
      params.permit(:date, :name, :time, :email)
    end
end
