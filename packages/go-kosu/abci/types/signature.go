package types

import (
	"encoding/hex"
	"errors"
)

var (
	// ErrSignatureDecode returned when bad signature input provided to constructor
	ErrSignatureDecode = errors.New("unable to decode provided string")
	// ErrSignatureLength returned when trying to load invalid length signatures
	ErrSignatureLength = errors.New("invalid length for signature")
)

// Signature represents a 65-byte Kosu order signature (from maker/poster)
type Signature [65]byte

// NewSignatureFromString creates a new signature provided a 0x-prefixed hex string
func NewSignatureFromString(input string) (signature Signature, e error) {
	decoded, err := hex.DecodeString(input[2:])
	if err != nil {
		e = ErrSignatureDecode
		return
	}

	if len(decoded) != 65 {
		e = ErrSignatureLength
		return
	}

	for i := 0; i < 65; i++ {
		signature[i] = decoded[i]
	}
	return
}

// Bytes returns the signature's underlying bytes
func (s *Signature) Bytes() (bytes []byte) {
	bytes = make([]byte, 65)
	for i := 0; i < 65; i++ {
		bytes[i] = s[i]
	}
	return
}

// String returns a representation of the signature as a 0x-prefixed hex string
func (s *Signature) String() (signature string) {
	decoded := hex.EncodeToString(s.Bytes())
	signature = "0x" + decoded
	return
}

// UnmarshalJSON implements the json.Unmarshaler interface
func (s *Signature) UnmarshalJSON(bytes []byte) error {
	encoded, err := hex.DecodeString(string(bytes)[3 : len(bytes)-1])
	if err != nil {
		return err
	}
	if len(encoded) != 65 {
		return ErrSignatureLength
	}
	for i := 0; i < 65; i++ {
		s[i] = encoded[i]
	}
	return nil
}
