// rpigpiowebcp.c
// Author: Piotr Dymacz (pepe2k@gmail.com)

#include "rpigpiowebcp.h"

/*
called when KLone server starts
prepares all defined GPIOs (mode and pull up/down in input mode or default value in output mode)
*/
int server_init( void ){
	int i = 0;
	
	if( bcm2835_init() ){
		
		if( gpio_outs_num > 0 || gpio_ins_num > 0 ){
		
			// GPIOs in output mode
			for( i = 0; i < gpio_outs_num; i++ ){
				
				bcm2835_gpio_fsel( gpio_outs[i].number, BCM2835_GPIO_FSEL_OUTP );
				
				bcm2835_gpio_write( gpio_outs[i].number, gpio_outs[i].default_val );
				
			}
			
			// GPIOs in input mode
			for( i = 0; i < gpio_ins_num; i++ ){
			
				bcm2835_gpio_fsel( gpio_ins[i].number, BCM2835_GPIO_FSEL_INPT );
				
				bcm2835_gpio_set_pud( gpio_ins[i].number, gpio_ins[i].mode );
				
			}
		
		} else {
			printf( "Nie zdefiniowano żadnych portów GPIO.\n" );
			exit( EXIT_FAILURE );
		}
	
	} else {
		printf( "Wystąpił błąd przy inicjalizacji GPIO.\nSerwer musi być uruchomiony z uprawnieniami root.\n" );
		exit( EXIT_FAILURE );
	}
	
	return 0;
}

/* user provided hooks setup */
void hooks_setup( void ){
	hook_server_init( server_init );
}

// GPIOs in output mode definition
// Please, refer to pin numbering and constants in bcm2835 library!
extern RpiGpioWebCpOut gpio_outs[] = {
	RPI_V2_GPIO_P1_11,	"P1.11 in P1 connector (RPi rev. 2)",	LOW
};

// GPIOs in input mode definition
// Please, refer to pin numbering and constants in bcm2835 library!
extern RpiGpioWebCpIn gpio_ins[] = {
	RPI_V2_GPIO_P1_13,	"P1.13 in P1 connector (RPi rev. 2)",	BCM2835_GPIO_PUD_DOWN
};

// count defined GPIOs
extern int gpio_outs_num = sizeof(gpio_outs) / sizeof(RpiGpioWebCpOut);
extern int gpio_ins_num	 = sizeof(gpio_ins)  / sizeof(RpiGpioWebCpIn);