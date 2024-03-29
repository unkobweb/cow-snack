moment.locale('fr');
let startDate = moment().add(1, 'day').format('DD/MM/YYYY');
let nextWeek = moment().add(1, 'week');
let maxDate = nextWeek.endOf('week').format('DD/MM/YYYY');

$.datetimepicker.setLocale('fr');
$('#datetimepicker').datetimepicker({
    formatDate: 'd/m/Y',
    format: 'Y-m-d',
    timepicker: false,
    disabledWeekDays: [0, 2, 6],
    startDate: startDate,
    minDate: startDate,
    maxDate: maxDate,
    todayButton: false,
    prevButton: false,
    nextButton: false,
    allowBlank: false,
    monthChangeSpinner: false,
    scrollMonth: false,
    dayOfWeekStart: 1,
    defaultSelect: false,
    inline: true
});

document.getElementById('livraisonSubmit').addEventListener('click', ()=>{
    console.log(document.getElementById("datetimepicker").value);
});