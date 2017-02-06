var countdown = 4000;
var linesvg;
var svg;
var bordersrc;
var bordersrcl;
var innersrc;
var Lightsrc;
var bgsrc;
var masksrc;
var bordermask;
var logo;
var stop;
var text;
var line0;
var line0l;
var line0a;
var line1;
var line1l;
var line1a;
var line2;
var line2l;
var line2a;
var line3;
var line3l;
var line3a;
var line4;
var line4l;
var line4a;
var line5;
var line5l;
var line5a;
var rect1;
var rect2;
var line0hover;
var line1hover;
var line2hover;
var line3hover;
var line4hover;
var line5hover;
var hover;
var lines;
var linesa;
var rad = 0;
BTN = 0;
$(document).ready(function() {
    $('.Right_Gear_WP').html('<svg id="linesvg" width="185px" height="400px"></svg>         <svg id="svg" width="400" height="400" style="margin-left: -12px" onclick="sendqueueaction()"></svg>');
    linesvg = Snap("#linesvg");
    svg = Snap("#svg");
    bordersrc = svg.circle(202, 202, 196);
    bordersrcl = svg.circle(202, 202, 196);
    bordersrca = svg.circle(202, 202, 196);
    innersrc = svg.circle(202, 202, 190);
    actionsrc = svg.circle(202, 202, 150);
    Lightsrc = svg.circle(202, 202, 150);
    errorsrc = svg.circle(202, 202, 150);
    bgsrc = svg.circle(202, 202, 144);
    masksrc = svg.circle(202, 55, 80);
    bordermask = svg.circle(10, 200, 80);
    logo = svg.image("img/play.png", 160, 120, 90, 90);
    stop = svg.image("img/stop.png", 160, 120, 90, 90);
    text = svg.text(120, 280, "ითამაშე");
    line0 = linesvg.path("M 2, 65 C 156, 65, 30, 178, 186, 178");
    line0l = linesvg.path("M 2, 65 C 156, 65, 30, 178, 186, 178");
    line0a = linesvg.path("M 2, 65 C 156, 65, 30, 178, 186, 178");
    line1 = linesvg.path("M 2, 119 C 155, 119, 30, 198, 185, 198");
    line1l = linesvg.path("M 2, 119 C 155, 119, 30, 198, 185, 198");
    line1a = linesvg.path("M 2, 119 C 155, 119, 30, 198, 185, 198");
    line2 = linesvg.path("M 2, 173 C 156, 173, 30, 218, 186, 218");
    line2l = linesvg.path("M 2, 173 C 156, 173, 30, 218, 186, 218");
    line2a = linesvg.path("M 2, 173 C 156, 173, 30, 218, 186, 218");
    line3 = linesvg.path("M 2, 226 C 156, 226, 30, 168, 186, 168");
    line3l = linesvg.path("M 2, 226 C 156, 226, 30, 168, 186, 168");
    line3a = linesvg.path("M 2, 226 C 156, 226, 30, 168, 186, 168");
    line4 = linesvg.path("M 2, 280 C 155, 280, 30, 188, 185, 188");
    line4l = linesvg.path("M 2, 280 C 155, 280, 30, 188, 185, 188");
    line4a = linesvg.path("M 2, 280 C 155, 280, 30, 188, 185, 188");
    line5 = linesvg.path("M 2, 334 C 155, 334, 30, 208, 185, 208");
    line5l = linesvg.path("M 2, 334 C 155, 334, 30, 208, 185, 208");
    line5a = linesvg.path("M 2, 334 C 155, 334, 30, 208, 185, 208");
    rect1 = Snap("#linesvg").rect(185, 0, 120, 800);
    rect2 = Snap("#linesvg").rect(400, 0, 120, 800);
    line0hover = Snap("#linesvg").rect(-90, 0, 120, 800);
    line1hover = Snap("#linesvg").rect(160, 0, 120, 800);
    line2hover = Snap("#linesvg").rect(160, 0, 120, 800);
    line3hover = Snap("#linesvg").rect(160, 0, 120, 800);
    line4hover = Snap("#linesvg").rect(160, 0, 120, 800);
    line5hover = Snap("#linesvg").rect(160, 0, 120, 800);
    hover = svg.g();
    hover.add(bgsrc, logo, text);
    lines = linesvg.g();
    lines.add(line0l, line1l, line2l, line3l, line4l, line5l);
    linesa = linesvg.g();
    linesa.add(line0a, line1a, line2a, line3a, line4a, line5a);
    rad = 0;
    setInterval(function() {
        rad += 360;
        masksrc.animate({
            transform: 'r' + rad + ',202,202'
        }, countdown)
    }, countdown);
    buttonaction('0');
    stop.attr({
        "visibility": "hidden"
    });
    linesa.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2
    });
    lines.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2,
        mask: rect1
    });
    line0a.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2,
        mask: line0hover
    });
    line1a.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2,
        mask: line1hover
    });
    line2a.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2,
        mask: line2hover
    });
    line3a.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2,
        mask: line3hover
    });
    line4a.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2,
        mask: line4hover
    });
    line5a.attr({
        fill: "transparent",
        stroke: "#FFF",
        strokeWidth: 2,
        mask: line5hover
    });
    rect1.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    rect2.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    line0hover.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    line1hover.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    line2hover.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    line3hover.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    line4hover.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    line5hover.attr({
        fill: "l(0,0,1,0)transparent-transparent-#FFF-transparent-transparent"
    });
    line0.attr({
        fill: "transparent",
        stroke: "#666",
        strokeWidth: 2
    });
    line1.attr({
        fill: "transparent",
        stroke: "#666",
        strokeWidth: 2
    });
    line2.attr({
        fill: "transparent",
        stroke: "#666",
        strokeWidth: 2
    });
    line3.attr({
        fill: "transparent",
        stroke: "#666",
        strokeWidth: 2
    });
    line4.attr({
        fill: "transparent",
        stroke: "#666",
        strokeWidth: 2
    });
    line5.attr({
        fill: "transparent",
        stroke: "#666",
        strokeWidth: 2
    });
    hover.attr({
        "cursor": "pointer"
    });
    hover.hover(function() {
        bgsrc.attr({
            fill: "l(0, 1, 0, 0)#666-transparent"
        })
    }, function() {
        bgsrc.attr({
            fill: "l(0, 0, 0, 1)#666-transparent"
        })
    });
    text.attr({
        fill: "#FFAC2A",
        "font-size": "40px",
        "font-family": "GEO_M"
    });
    bgsrc.attr({
        opacity: 0.8,
        fill: "l(0, 0, 0, 1)#666-transparent"
    });
    masksrc.attr({
        fill: "r()#FFFFFF-transparent"
    });
    bordermask.attr({
        fill: "r()#FFFFFF-transparent",
        visibility: "hidden"
    });
    actionsrc.attr({
        fill: 'transparent',
        stroke: '#FFAC2A',
        strokeWidth: 8
    });
    errorsrc.attr({
        fill: 'transparent',
        stroke: '#F00',
        strokeWidth: 9
    });
    Lightsrc.attr({
        fill: 'transparent',
        stroke: '#FFF',
        strokeWidth: 8,
        mask: masksrc
    });
    innersrc.attr({
        opacity: 0.8,
        fill: "r()transparent-#202020"
    });
    bordersrca.attr({
        fill: 'transparent',
        stroke: '#FFF',
        strokeWidth: 2,
        mask: bordermask
    });
    bordersrcl.attr({
        fill: 'transparent',
        stroke: '#FFF',
        strokeWidth: 2,
        mask: rect2
    });
    bordersrc.attr({
        fill: 'transparent',
        stroke: '#666',
        strokeWidth: 2
    })
});

function buttonaction(BTN) {
    switch (BTN) {
        case '10':
            firstbuttonaction(BTN);
            break;
        case '11':
            queuebuttonaction(BTN);
            break;
        default:
            changebtnerroraction();
            break
    }
}
var queuetimer;

function queuebuttonaction(def) {
    changehover(def);
    stopfirstaction();
    rect2.animate({
        x: -120
    }, 1000, function() {
        rect1.animate({
            x: -60
        }, 1000, mina.bounce)
    });
    var dis = true;
    queuetimer = setInterval(function() {
        if (dis === true) {
            dis = false;
            rect1.animate({
                x: 185
            }, 1000, function() {
                rect2.animate({
                    x: 340
                }, 1000, mina.bounce)
            }, mina.bounce)
        } else {
            dis = true;
            rect2.animate({
                x: -120
            }, 1000, function() {
                rect1.animate({
                    x: -60
                }, 1000, mina.bounce)
            })
        }
    }, 4000)
}

function stopfirstaction() {
    line0hover.stop();
    line1hover.stop();
    line2hover.stop();
    line3hover.stop();
    line4hover.stop();
    line5hover.stop();
    bordermask.stop();
    bordermask.attr({
        visibility: "hidden"
    });
    line0hover.attr({
        x: -90
    });
    line1hover.attr({
        x: 160
    });
    line2hover.attr({
        x: 160
    });
    line3hover.attr({
        x: 160
    });
    line4hover.attr({
        x: 160
    });
    line5hover.attr({
        x: 160
    })
}

function stopqueueaction() {
    clearInterval(queuetimer);
    rect1.stop();
    rect2.stop();
    rect1.attr({
        x: -90
    });
    rect2.attr({
        x: -120
    })
}

function firstbuttonaction(def) {
    if (def != '10') {
        return
    }
    changehover(def);
    stopfirstaction();
    stopqueueaction();
    line0hover.animate({
        x: -90
    }, 1000, function() {
        line0hover.animate({
            x: 160
        }, 1000, function() {
            bordermask.attr({
                visibility: "visible"
            });
            bordermask.animate({
                transform: 'r360,202,202'
            }, 1000, function() {
                bordermask.attr({
                    visibility: "hidden"
                });
                line1hover.animate({
                    x: -90
                }, 1000, function() {
                    line1hover.animate({
                        x: 160
                    }, 1000, function() {
                        bordermask.attr({
                            visibility: "visible"
                        });
                        bordermask.animate({
                            transform: 'r0,202,202'
                        }, 1000, function() {
                            bordermask.attr({
                                visibility: "hidden"
                            });
                            line2hover.animate({
                                x: -90
                            }, 1000, function() {
                                line2hover.animate({
                                    x: 160
                                }, 1000, function() {
                                    bordermask.attr({
                                        visibility: "visible"
                                    });
                                    bordermask.animate({
                                        transform: 'r360,202,202'
                                    }, 1000, function() {
                                        bordermask.attr({
                                            visibility: "hidden"
                                        });
                                        line3hover.animate({
                                            x: -90
                                        }, 1000, function() {
                                            line3hover.animate({
                                                x: 160
                                            }, 1000, function() {
                                                bordermask.attr({
                                                    visibility: "visible"
                                                });
                                                bordermask.animate({
                                                    transform: '0,202,202'
                                                }, 1000, function() {
                                                    bordermask.attr({
                                                        visibility: "hidden"
                                                    });
                                                    line4hover.animate({
                                                        x: -90
                                                    }, 1000, function() {
                                                        line4hover.animate({
                                                            x: 160
                                                        }, 1000, function() {
                                                            bordermask.attr({
                                                                visibility: "visible"
                                                            });
                                                            bordermask.animate({
                                                                transform: 'r360,202,202'
                                                            }, 1000, function() {
                                                                bordermask.attr({
                                                                    visibility: "hidden"
                                                                });
                                                                line5hover.animate({
                                                                    x: -90
                                                                }, 1000, function() {
                                                                    line5hover.animate({
                                                                        x: 160
                                                                    }, 1000, function() {
                                                                        bordermask.attr({
                                                                            visibility: "visible"
                                                                        });
                                                                        bordermask.animate({
                                                                            transform: '0,202,202'
                                                                        }, 1000, function() {
                                                                            bordermask.attr({
                                                                                visibility: "hidden"
                                                                            });
                                                                            buttonaction('10')
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
var queue = false;

function sendqueueaction() {
    if (queue === false) {
        SendOption();
        queue = true
    } else {
        leavequeue();
        queue = false
    }
}

function changehover(arg) {
    arg = parseInt(arg);
    switch (arg) {
        case 10:
            stop.attr({
                "visibility": "hidden"
            });
            logo.attr({
                "visibility": "visible"
            });
            text.attr({
                text: 'ითამაშე',
                "font-size": "40px",
                x: 120
            });
            errorsrc.attr({
                "visibility": "hidden"
            });
            countdown = 4000;
            break;
        case 11:
            stop.attr({
                "visibility": "visible"
            });
            logo.attr({
                "visibility": "hidden"
            });
            errorsrc.attr({
                "visibility": "hidden"
            });
            text.attr({
                text: 'რიგიდან ამოწერა',
                "font-size": "20px",
                x: 105
            });
            countdown = 1000;
            break
    }
}

function changebtnerroraction() {
    stop.attr({
        "visibility": "hidden"
    });
    logo.attr({
        "visibility": "hidden"
    });
    text.attr({
        text: 'შეცდომაა',
        "font-size": "40px",
        x: 95
    });
    errorsrc.attr({
        "visibility": "visible"
    })
}