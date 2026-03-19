# uuu.ctrl

Tools for working with control sources, such as MIDI controllers, computer keyboard, and more.

## uuu.ctrl.map

A control source (MIDI, computer keyboard, and mouse) mapping utility inspired by [pdm.midi.map](https://github.com/pdmeyer/philip-meyer-max-tutorials/tree/main/patchers/osc-midi-map) by Philip Meyer. The implementation is fairly different (I’m using `dict` instead of `coll`, for instance). To understand why I’ve made this utility despite Max’s built-in support for mapping and tools like `pdm.midi.map`, see the section below. 

### Why another mapping utility?

1. Each control source (MIDI CC; note and computer keyboard support incoming) may be mapped to more than one parameter, and each parameter may be mapped to more than one control source.
2. A global bypass may be applied to any parameters without a `"neverbypass": 1`. This is useful when you have a continuous controller but would like to hold a value while you adjust the controller. 
3. You may send all mapped parameter values back out to the control sources. This is useful when you need to initialize or synchronize your controller with the parameters.

### Requirements

#### System

`uuu.midi.map` has been tested on Max 9.1.3 on an M4 MacBook Pro running Sequoia. It probably doesn’t work on Windows right out of the box.

#### Settings

`uuu.midi.map` is designed to work with the following settings (you may either change them at the patcher level via the patcher inspector or globally via Preferences):

1. OSC Address Prefix Type = None
2. OSC Value To Send = Normalized Only*
3. Use /param Prefix For Parameters = False
4. OSC Enabled Default = True

\* The normalized values are used to avoid a bug with how parameter-enabled objects deal with the scaling exponents. The downside is that the control source’s scaling exponent must be the same as the parameter’s. This doesn’t seem to be an issue in most use cases.

In addition, to expose a parameter to OSC, the parameter type must be be set to `int` or `float`. An `enum` would trigger `param.osc` to send out a fullpacket message, but the message cannot be converted by `o.atomize`.

### Control sources

1. MIDI CC\*
2. MIDI note\*
3. Computer keyboard
4. Mouse X\*\*
5. Mouse Y\*\*

\* MIDI CC and note messages are always sent back out according to the actual parameter values. When a CC or note message is received, it is converted to OSC. The OSC message is then received and converted back to a CC or note message sent out to the same MIDI device. Other control sources are receive only.

\*\* Mouse positions are scaled according to the dimensions of the main screen. Therefore, if using an external monitor, make sure to check which one is the main screen to avoid scaling issues.

### Options

- `scale` scales the input control values to normalized parameter values. The default (input 0–127, output 0–1., exponent 1.) should work in most cases. One use case of `scale` is reversing the polarity of the control.
- `never hold` allows the parameter to bypass `hold` messages to the patcher. A `hold 1` message will otherwise stop control values from converting to OSC messages, and a `hold 0` message will immediately send out all the changed values at once.
- `flip` always changes the truth value to its opposite, so if the current value is 0, any value sent to the parameter will become 1; if the current value is 1, any value sent to the parameter will become 0. If the current value is a value between 0 and 1, it is first rounded then flipped (e.g., 0.2 will become 1).
- `ignore values` include a list of controller values to be ignored. An ignore values of `0` (like `stripnote`) may be combined with the `flip` option to make a on/off control act like a button.

### Known issues

1. The initialization at loading is currently delayed by 100 ms. Without the delay, the controller will not update with the initial parameter values.

### Future plans

1. Support for fine tuning. This may be achieved with relative encoder mode (default: CC#65 increments and CC#63 decrements); and optionally, with modified behavior during a button press.
2. Support for finger tracking on the trackpad, a la Fingerpinger (currently unsupported on ARM-based chips).







