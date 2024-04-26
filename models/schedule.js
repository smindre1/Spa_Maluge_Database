const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    January: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    February: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    March: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    April: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    May: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    June: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    July: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    August: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    September: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    October: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    November: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
    December: [{
        day: {
            type: Number,
            required: true,
        },
        timeSlots: [{
            time: {
                type: Number,
                required: true,
            },
            availability: [{
                room: {
                    type: Number,
                    required: true,
                },
                available: {
                    type: Boolean,
                    required: true,
                }
            }]
        }],
    }],
});

const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;
