// rpigpiowebcp.h
// Author: Piotr Dymacz (pepe2k@gmail.com)

#ifndef RPIGPIOWEBCP_H
#define RPIGPIOWEBCP_H

#include <stdio.h>
#include <klone/klone.h>
#include <bcm2835.h>

#define RPIGPIOWEBCP_VERSION "ver. 1.0"

/* struct definition for single GPIO in output mode */
typedef struct {
	RPiGPIOPin	number;
	const char*	name;
	uint8_t		default_val;
} RpiGpioWebCpOut;

/* struct definition for single GPIO in input mode */
typedef struct {
	RPiGPIOPin			number;
	const char*			name;
	bcm2835PUDControl	mode;
} RpiGpioWebCpIn;

/* GPIO definition arrays */
extern RpiGpioWebCpOut	gpio_outs[];
extern RpiGpioWebCpIn	gpio_ins[];

/* number of defined GPIOs */
extern int gpio_outs_num;
extern int gpio_ins_num;

int server_init( void );

#endif /* RPIGPIOWEBCP_H */