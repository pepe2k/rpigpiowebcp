# always include common.mk in MaKL-based makefiles
include common.mk

# include klone-related variables
include ../vars.mk

# name of the library
LIB = rpigpiowebcp

# list of source files
SRCS = rpigpiowebcp.c

# compilation flags
CFLAGS += -I ../include $(KLONE_CFLAGS)

include lib.mk
