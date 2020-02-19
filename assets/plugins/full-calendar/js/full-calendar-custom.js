$(document).ready(function() {
	var todayDate = moment().startOf('day');
	var YM = todayDate.format('YYYY-MM');
	var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
	var TODAY = todayDate.format('YYYY-MM-DD');
	var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');
	var initialLocaleCode = 'en';

	var events =[
			{
				title: 'All Day Event',
				start: YM + '-01'
			},
			{
				title: 'Long Event',
				start: YM + '-07',
				end: YM + '-10'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-09T16:00:00'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-16T16:00:00'
			},
			{
				title: 'Conference',
				start: YESTERDAY,
				end: TOMORROW
			},
			{
				title: 'Meeting',
				start: TODAY + 'T10:30:00',
				end: TODAY + 'T12:30:00'
			},
			{
				title: 'Lunch',
				start: TODAY + 'T12:00:00'
			},
			{
				title: 'Meeting',
				start: TODAY + 'T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: TODAY + 'T17:30:00'
			},
			{
				title: 'Dinner',
				start: TODAY + 'T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: TOMORROW + 'T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: YM + '-28'
			}
		];

		//Events colors
		var eventColors =[
			{
				title: 'All Day Event',
				start: YM + '-01',
				color: '#EF5350',
			},
			{
				title: 'Long Event',
				start: YM + '-07',
				end: YM + '-10',
				color: '#26A69A'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-09T16:00:00',
				color: '#26A69A'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-16T16:00:00',
				color: '#5C6BC0'
			},
			{
				title: 'Conference',
				start: YESTERDAY,
				end: TOMORROW,
				color: '#546E7A'
			},
			{
				title: 'Meeting',
				start: TODAY + 'T10:30:00',
				end: TODAY + 'T12:30:00',
				color: '#546E7A'
			},
			{
				title: 'Lunch',
				start: TODAY + 'T12:00:00',
				color: '#546E7A'
			},
			{
				title: 'Meeting',
				start: TODAY + 'T14:30:00',
				color: '#546E7A'
			},
			{
				title: 'Happy Hour',
				start: TODAY + 'T17:30:00',
				color: '#546E7A'
			},
			{
				title: 'Dinner',
				start: TODAY + 'T20:00:00',
				color: '#546E7A'
			},
			{
				title: 'Birthday Party',
				start: TOMORROW + 'T07:00:00',
				color: '#546E7A'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: YM + '-28',
				color: '#FF7043'
			}
		];

		//Events background colors
		var eventBackgroundColors =[
			{
				title: 'All Day Event',
				start: YM + '-01',
			},
			{
				title: 'Long Event',
				start: YM + '-07',
				end: YM + '-10',
				color: '#26A69A',
                rendering: 'background'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-09T16:00:00',
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: YM + '-16T16:00:00',
			},
			{
				title: 'Conference',
				start: YESTERDAY,
				end: TOMORROW,
			},
			{
				title: 'Meeting',
				start: TODAY + 'T10:30:00',
				end: TODAY + 'T12:30:00',
			},
			{
				title: 'Lunch',
				start: TODAY + 'T12:00:00',
			},
			{
				title: 'Meeting',
				start: TODAY + 'T14:30:00',
			},
			{
				title: 'Happy Hour',
				start: TODAY + 'T17:30:00',
			},
			{
				title: 'Dinner',
				start: TODAY + 'T20:00:00',
			},
			{
				title: 'Birthday Party',
				start: TOMORROW + 'T07:00:00',
			}
		];

	 // Basic view
	if($('.basic-full-calendar').length >0){
		$('.basic-full-calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			navLinks: true,
			events: events
		});	
	}

	// Agenda view
	if($('.agenda-full-calendar').length > 0){
		$('.agenda-full-calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true,
			defaultView: 'agendaWeek',
			eventLimit: true, // allow "more" link when too many events
			navLinks: true,
			events: events
		});
	}

	// Event Color
	if($('.event-color-full-calendar').length > 0){
		$('.event-color-full-calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			navLinks: true,
			events: eventColors
		});	
	}

	// Event Background Color
	if($('.bg-color-full-calendar').length > 0){
		$('.bg-color-full-calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			navLinks: true,
			events: eventBackgroundColors
		});	
	}

	// Date Format
	if($('.format-full-calendar').length > 0){
		$('.format-full-calendar').fullCalendar({
	        header: {
	            left: 'prev,next today',
	            center: 'title',
	            right: 'month,basicWeek,basicDay'
	        },
	        views: {
		        month: { // name of view
		            titleFormat: 'YYYY, MM, DD'
		            // other view-specific options here
		        }
		    },
	        editable: true,
	        events: events
	    });
	}

	// Internationalization
	if($('.language-full-calendar').length > 0){
		$('.language-full-calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			editable: true,
			locale: initialLocaleCode,
			buttonIcons: false,
			weekNumbers: true,
			events: events
		});	
		// build the locale selector's options
		$.each($.fullCalendar.locales, function(localeCode) {
			$('#locale-selector').append(
				$('<option/>')
					.attr('value', localeCode)
					.prop('selected', localeCode == initialLocaleCode)
					.text(localeCode)
			);
		});

		// when the selected option changes, dynamically change the calendar option
		$('#locale-selector').on('change', function() {
			if (this.value) {
				$('.language-full-calendar').fullCalendar('option', 'locale', this.value);
			}
		});
	}


	// External events

	if($('.external-full-calendar').length > 0){
	    // Initialize the calendar
	    $('.external-full-calendar').fullCalendar({
	        header: {
	            left: 'prev,next today',
	            center: 'title',
	            right: 'month,agendaWeek,agendaDay'
	        },
	        editable: true,
	        events: eventColors,
	        locale: 'en',
	        droppable: true, // this allows things to be dropped onto the calendar
	            drop: function() {
	            if ($('#drop-remove').is(':checked')) { // is the "remove after drop" checkbox checked?
	                $(this).remove(); // if so, remove the element from the "Draggable Events" list
	            }
	        }
	    });


	    // Initialize the external events
	    $('#external-events .fc-event').each(function() {

	        // Different colors for events
	        $(this).css({'backgroundColor': $(this).data('color'), 'borderColor': $(this).data('color')});

	        // Store data so the calendar knows to render an event upon drop
	        $(this).data('event', {
	            title: $.trim($(this).html()), // use the element's text as the event title
	            color: $(this).data('color'),
	            stick: true // maintain when user navigates (see docs on the renderEvent method)
	        });

	        // Make the event draggable using jQuery UI
	        $(this).draggable({
	            zIndex: 999,
	            revert: true, // will cause the event to go back to its
	            revertDuration: 0 // original position after the drag
	        });
	    });
	}

    // Rtl Support
    if($('.rtl-full-calendar').length > 0){
	    $('.rtl-full-calendar').fullCalendar({
	        header: {
	            left: 'prev,next today',
	            center: 'title',
	            right: 'month,agendaWeek,agendaDay'
	        },
	        editable: true,
	        isRTL: true,
	        lang: 'ar',
	        events: events
	    });
	}
});