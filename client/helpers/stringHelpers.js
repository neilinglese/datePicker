Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

Template.registerHelper('convertDate', function(date){
    var momentFromDate = moment(date);
    var getMonth = momentFromDate.format('MMMM');
    var getYear = momentFromDate.format('YYYY');
    return getMonth + ' ' + getYear;
});
