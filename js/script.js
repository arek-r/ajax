var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('.countries');
var table = $('.table');
var results = $('.results');
var table = $('.table');
var country = $('.country');
var capital = $('.capital');
var landArea = $('.land-area');
var population = $('.population');
var language = $('.language');
var currency = $('.currency');

hideElements();

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
	resp.forEach(function(element) {
		var state = element.name.toLowerCase();
		var searchStr = $('#country-search').val();
		if (state.includes(searchStr)) {
			$('<li>').addClass('country-name').text(element.name).appendTo('.results');
		}
	});
	$('.info').hide();
	countriesList.show();
	$('#clear').show();
	selectCountryName();
};

function selectCountryName() {
	$('li.country-name').on('click', function() {
		var countryName = $(this).text();
		$.ajax({
			url: url + countryName,
			method: 'GET',
			success: showCountryDetails
		});
	});
};

function showCountryDetails(resp) {
	$('td').remove();
	resp.forEach(function(element) {
		$('<td>').text(element.name).appendTo(country);
		$('<td>').text(element.capital).appendTo(capital);
		$('<td>').text(element.area).appendTo(landArea);
		$('<td>').text(element.population).appendTo(population);
		$('<td>').text(element.languages).appendTo(language);
		$('<td>').text(element.currencies[0]).appendTo(currency);
	});
	showElements();

};

$('#clear').on('click', function() {
	hideElements();
	$('li').remove();
	$('#country-search').val('').focus();
});

function hideElements() {
	countriesList.hide();
	table.hide();
	$('#clear').hide();
};

function showElements() {
	countriesList.show();
	table.show();
	$('#clear').show();
};