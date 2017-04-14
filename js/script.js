var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('.countries');
var country = $('.country');
var capital = $('.capital');
var landArea = $('.land-area');
var population = $('.population');
var language = $('.language');
var currency = $('.currency');

countriesList.hide();

$('#search').click(searchCountries);

function searchCountries() {
	var countryName = $('#country-search').val();
	if (!countriesList) countryName = 'Poland';

	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList
	});
};

function showCountriesList(resp) {

	var minus = resp.length - 5;
	resp.splice(5, minus);
	
	resp.forEach(function(element) {
		
		$('.info').hide();
		countriesList.show();

		$('<td>').text(element.name).appendTo(country);
		$('<td>').text(element.capital).appendTo(capital);
		$('<td>').text(element.area).appendTo(landArea);
		$('<td>').text(element.population).appendTo(population);
		$('<td>').text(element.languages).appendTo(language);
		$('<td>').text(element.currencies[0]).appendTo(currency);

	});
};

$('#clear').on('click', function() {
	$('td').remove();
	countriesList.hide();
	$('#country-search').val('').focus();
});