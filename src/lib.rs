use getrandom::getrandom;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub extern "C" fn generate_random_string(length: usize) -> String {
    let mut rand_string = String::with_capacity(length);

    let mut bytes = [0u8; 1];
    for _ in 0..length {
        getrandom(&mut bytes).expect("Error generating random byte");

        let rand_char = match bytes[0] % 62 {
            n @ 0..=25 => char::from(u8::from(b'a') + n),
            n @ 26..=51 => char::from(u8::from(b'A') + (n - 26)),
            n @ 52..=61 => char::from(u8::from(b'0') + (n - 52)),
            _ => unreachable!(),
        };

        rand_string.push(rand_char);
    }

    rand_string
}
