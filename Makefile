KLONE_VERSION = 3.1.0

export MAKL_DIR = $(shell pwd)/klone-${KLONE_VERSION}/build/makl
export MAKEFLAGS = -I$(MAKL_DIR)/mk

# add --enable_debug to enable debug
KLONE_CONF_ARGS += --enable_hooks

# webapp directory (must be absolute)
WEBAPP_DIR = $(CURDIR)/webapp

# also run make in the build directory (must be absolute paths)
SUBDIR = $(CURDIR)/lib

# include directories
WEBAPP_CFLAGS = -I$(CURDIR)/lib

# static libraries
WEBAPP_LDADD = $(CURDIR)/lib/librpigpiowebcp.a

# dynamic libraries
WEBAPP_LDFLAGS = -lrt -lbcm2835

include klapp.mk

klapp.mk: ; wget -O $@ -c http://koanlogic.com/klone/klapp.mk