class ApplicationService

  attr_accessor :errors

  def initialize(args = {})
    @errors = []
  end

  def call
    return completed_without_errors?
  end

  private

  def add_to_errors(errors_array)
    self.errors += errors_array
  end

  def completed_without_errors?
    return errors.none?
  end

end # class ApplicationService
