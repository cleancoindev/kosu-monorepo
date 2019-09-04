// Code generated by protoc-gen-go. DO NOT EDIT.
// source: types.proto

package types

import (
	fmt "fmt"
	math "math"

	proto "github.com/golang/protobuf/proto"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type TransactionWitness_Subject int32

const (
	TransactionWitness_POSTER    TransactionWitness_Subject = 0
	TransactionWitness_VALIDATOR TransactionWitness_Subject = 1
)

var TransactionWitness_Subject_name = map[int32]string{
	0: "POSTER",
	1: "VALIDATOR",
}

var TransactionWitness_Subject_value = map[string]int32{
	"POSTER":    0,
	"VALIDATOR": 1,
}

func (x TransactionWitness_Subject) String() string {
	return proto.EnumName(TransactionWitness_Subject_name, int32(x))
}

func (TransactionWitness_Subject) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{9, 0}
}

//*
// BigInt
type BigInt struct {
	Value                []byte   `protobuf:"bytes,1,opt,name=value,proto3" json:"value,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *BigInt) Reset()         { *m = BigInt{} }
func (m *BigInt) String() string { return proto.CompactTextString(m) }
func (*BigInt) ProtoMessage()    {}
func (*BigInt) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{0}
}

func (m *BigInt) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BigInt.Unmarshal(m, b)
}
func (m *BigInt) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BigInt.Marshal(b, m, deterministic)
}
func (m *BigInt) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BigInt.Merge(m, src)
}
func (m *BigInt) XXX_Size() int {
	return xxx_messageInfo_BigInt.Size(m)
}
func (m *BigInt) XXX_DiscardUnknown() {
	xxx_messageInfo_BigInt.DiscardUnknown(m)
}

var xxx_messageInfo_BigInt proto.InternalMessageInfo

func (m *BigInt) GetValue() []byte {
	if m != nil {
		return m.Value
	}
	return nil
}

//*
// RoundInfo
type RoundInfo struct {
	Number               uint64   `protobuf:"varint,1,opt,name=number,proto3" json:"number,omitempty"`
	StartsAt             uint64   `protobuf:"varint,2,opt,name=starts_at,json=startsAt,proto3" json:"starts_at,omitempty"`
	EndsAt               uint64   `protobuf:"varint,3,opt,name=ends_at,json=endsAt,proto3" json:"ends_at,omitempty"`
	Limit                uint64   `protobuf:"varint,4,opt,name=limit,proto3" json:"limit,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *RoundInfo) Reset()         { *m = RoundInfo{} }
func (m *RoundInfo) String() string { return proto.CompactTextString(m) }
func (*RoundInfo) ProtoMessage()    {}
func (*RoundInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{1}
}

func (m *RoundInfo) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_RoundInfo.Unmarshal(m, b)
}
func (m *RoundInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_RoundInfo.Marshal(b, m, deterministic)
}
func (m *RoundInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_RoundInfo.Merge(m, src)
}
func (m *RoundInfo) XXX_Size() int {
	return xxx_messageInfo_RoundInfo.Size(m)
}
func (m *RoundInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_RoundInfo.DiscardUnknown(m)
}

var xxx_messageInfo_RoundInfo proto.InternalMessageInfo

func (m *RoundInfo) GetNumber() uint64 {
	if m != nil {
		return m.Number
	}
	return 0
}

func (m *RoundInfo) GetStartsAt() uint64 {
	if m != nil {
		return m.StartsAt
	}
	return 0
}

func (m *RoundInfo) GetEndsAt() uint64 {
	if m != nil {
		return m.EndsAt
	}
	return 0
}

func (m *RoundInfo) GetLimit() uint64 {
	if m != nil {
		return m.Limit
	}
	return 0
}

//*
// ConsensusParams
type ConsensusParams struct {
	FinalityThreshold     uint32   `protobuf:"varint,1,opt,name=FinalityThreshold,proto3" json:"FinalityThreshold,omitempty"`
	PeriodLimit           uint64   `protobuf:"varint,2,opt,name=PeriodLimit,proto3" json:"PeriodLimit,omitempty"`
	PeriodLength          uint32   `protobuf:"varint,3,opt,name=PeriodLength,proto3" json:"PeriodLength,omitempty"`
	MaxOrderBytes         uint32   `protobuf:"varint,4,opt,name=MaxOrderBytes,proto3" json:"MaxOrderBytes,omitempty"`
	ConfirmationThreshold uint64   `protobuf:"varint,5,opt,name=ConfirmationThreshold,proto3" json:"ConfirmationThreshold,omitempty"`
	BlocksBeforePruning   uint64   `protobuf:"varint,6,opt,name=BlocksBeforePruning,proto3" json:"BlocksBeforePruning,omitempty"`
	XXX_NoUnkeyedLiteral  struct{} `json:"-"`
	XXX_unrecognized      []byte   `json:"-"`
	XXX_sizecache         int32    `json:"-"`
}

func (m *ConsensusParams) Reset()         { *m = ConsensusParams{} }
func (m *ConsensusParams) String() string { return proto.CompactTextString(m) }
func (*ConsensusParams) ProtoMessage()    {}
func (*ConsensusParams) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{2}
}

func (m *ConsensusParams) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ConsensusParams.Unmarshal(m, b)
}
func (m *ConsensusParams) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ConsensusParams.Marshal(b, m, deterministic)
}
func (m *ConsensusParams) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ConsensusParams.Merge(m, src)
}
func (m *ConsensusParams) XXX_Size() int {
	return xxx_messageInfo_ConsensusParams.Size(m)
}
func (m *ConsensusParams) XXX_DiscardUnknown() {
	xxx_messageInfo_ConsensusParams.DiscardUnknown(m)
}

var xxx_messageInfo_ConsensusParams proto.InternalMessageInfo

func (m *ConsensusParams) GetFinalityThreshold() uint32 {
	if m != nil {
		return m.FinalityThreshold
	}
	return 0
}

func (m *ConsensusParams) GetPeriodLimit() uint64 {
	if m != nil {
		return m.PeriodLimit
	}
	return 0
}

func (m *ConsensusParams) GetPeriodLength() uint32 {
	if m != nil {
		return m.PeriodLength
	}
	return 0
}

func (m *ConsensusParams) GetMaxOrderBytes() uint32 {
	if m != nil {
		return m.MaxOrderBytes
	}
	return 0
}

func (m *ConsensusParams) GetConfirmationThreshold() uint64 {
	if m != nil {
		return m.ConfirmationThreshold
	}
	return 0
}

func (m *ConsensusParams) GetBlocksBeforePruning() uint64 {
	if m != nil {
		return m.BlocksBeforePruning
	}
	return 0
}

//*
// Poster
type Poster struct {
	Balance              *BigInt  `protobuf:"bytes,1,opt,name=balance,proto3" json:"balance,omitempty"`
	Limit                uint64   `protobuf:"varint,2,opt,name=limit,proto3" json:"limit,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Poster) Reset()         { *m = Poster{} }
func (m *Poster) String() string { return proto.CompactTextString(m) }
func (*Poster) ProtoMessage()    {}
func (*Poster) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{3}
}

func (m *Poster) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Poster.Unmarshal(m, b)
}
func (m *Poster) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Poster.Marshal(b, m, deterministic)
}
func (m *Poster) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Poster.Merge(m, src)
}
func (m *Poster) XXX_Size() int {
	return xxx_messageInfo_Poster.Size(m)
}
func (m *Poster) XXX_DiscardUnknown() {
	xxx_messageInfo_Poster.DiscardUnknown(m)
}

var xxx_messageInfo_Poster proto.InternalMessageInfo

func (m *Poster) GetBalance() *BigInt {
	if m != nil {
		return m.Balance
	}
	return nil
}

func (m *Poster) GetLimit() uint64 {
	if m != nil {
		return m.Limit
	}
	return 0
}

//*
// Validator
type Validator struct {
	Balance              *BigInt  `protobuf:"bytes,1,opt,name=balance,proto3" json:"balance,omitempty"`
	Power                int64    `protobuf:"varint,2,opt,name=power,proto3" json:"power,omitempty"`
	PublicKey            []byte   `protobuf:"bytes,3,opt,name=publicKey,proto3" json:"publicKey,omitempty"`
	EthAccount           string   `protobuf:"bytes,4,opt,name=ethAccount,proto3" json:"ethAccount,omitempty"`
	FirstVote            int64    `protobuf:"varint,5,opt,name=firstVote,proto3" json:"firstVote,omitempty"`
	LastVoted            int64    `protobuf:"varint,6,opt,name=lastVoted,proto3" json:"lastVoted,omitempty"`
	LastProposed         int64    `protobuf:"varint,7,opt,name=lastProposed,proto3" json:"lastProposed,omitempty"`
	TotalVotes           int64    `protobuf:"varint,8,opt,name=totalVotes,proto3" json:"totalVotes,omitempty"`
	Active               bool     `protobuf:"varint,9,opt,name=active,proto3" json:"active,omitempty"`
	Genesis              bool     `protobuf:"varint,10,opt,name=genesis,proto3" json:"genesis,omitempty"`
	Applied              bool     `protobuf:"varint,11,opt,name=applied,proto3" json:"applied,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Validator) Reset()         { *m = Validator{} }
func (m *Validator) String() string { return proto.CompactTextString(m) }
func (*Validator) ProtoMessage()    {}
func (*Validator) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{4}
}

func (m *Validator) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Validator.Unmarshal(m, b)
}
func (m *Validator) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Validator.Marshal(b, m, deterministic)
}
func (m *Validator) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Validator.Merge(m, src)
}
func (m *Validator) XXX_Size() int {
	return xxx_messageInfo_Validator.Size(m)
}
func (m *Validator) XXX_DiscardUnknown() {
	xxx_messageInfo_Validator.DiscardUnknown(m)
}

var xxx_messageInfo_Validator proto.InternalMessageInfo

func (m *Validator) GetBalance() *BigInt {
	if m != nil {
		return m.Balance
	}
	return nil
}

func (m *Validator) GetPower() int64 {
	if m != nil {
		return m.Power
	}
	return 0
}

func (m *Validator) GetPublicKey() []byte {
	if m != nil {
		return m.PublicKey
	}
	return nil
}

func (m *Validator) GetEthAccount() string {
	if m != nil {
		return m.EthAccount
	}
	return ""
}

func (m *Validator) GetFirstVote() int64 {
	if m != nil {
		return m.FirstVote
	}
	return 0
}

func (m *Validator) GetLastVoted() int64 {
	if m != nil {
		return m.LastVoted
	}
	return 0
}

func (m *Validator) GetLastProposed() int64 {
	if m != nil {
		return m.LastProposed
	}
	return 0
}

func (m *Validator) GetTotalVotes() int64 {
	if m != nil {
		return m.TotalVotes
	}
	return 0
}

func (m *Validator) GetActive() bool {
	if m != nil {
		return m.Active
	}
	return false
}

func (m *Validator) GetGenesis() bool {
	if m != nil {
		return m.Genesis
	}
	return false
}

func (m *Validator) GetApplied() bool {
	if m != nil {
		return m.Applied
	}
	return false
}

//*
// SignedTransaction.
//
// This is the only Transaction accepted by the node. It's composed by a Transaction and it's Proof.
type SignedTransaction struct {
	Proof                *Proof       `protobuf:"bytes,1,opt,name=proof,proto3" json:"proof,omitempty"`
	Tx                   *Transaction `protobuf:"bytes,2,opt,name=tx,proto3" json:"tx,omitempty"`
	XXX_NoUnkeyedLiteral struct{}     `json:"-"`
	XXX_unrecognized     []byte       `json:"-"`
	XXX_sizecache        int32        `json:"-"`
}

func (m *SignedTransaction) Reset()         { *m = SignedTransaction{} }
func (m *SignedTransaction) String() string { return proto.CompactTextString(m) }
func (*SignedTransaction) ProtoMessage()    {}
func (*SignedTransaction) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{5}
}

func (m *SignedTransaction) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_SignedTransaction.Unmarshal(m, b)
}
func (m *SignedTransaction) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_SignedTransaction.Marshal(b, m, deterministic)
}
func (m *SignedTransaction) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SignedTransaction.Merge(m, src)
}
func (m *SignedTransaction) XXX_Size() int {
	return xxx_messageInfo_SignedTransaction.Size(m)
}
func (m *SignedTransaction) XXX_DiscardUnknown() {
	xxx_messageInfo_SignedTransaction.DiscardUnknown(m)
}

var xxx_messageInfo_SignedTransaction proto.InternalMessageInfo

func (m *SignedTransaction) GetProof() *Proof {
	if m != nil {
		return m.Proof
	}
	return nil
}

func (m *SignedTransaction) GetTx() *Transaction {
	if m != nil {
		return m.Tx
	}
	return nil
}

//*
// Proof is used to sign a Transaction and produce a SignedTransaction.
type Proof struct {
	PublicKey            []byte   `protobuf:"bytes,1,opt,name=public_key,json=publicKey,proto3" json:"public_key,omitempty"`
	Signature            []byte   `protobuf:"bytes,2,opt,name=signature,proto3" json:"signature,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Proof) Reset()         { *m = Proof{} }
func (m *Proof) String() string { return proto.CompactTextString(m) }
func (*Proof) ProtoMessage()    {}
func (*Proof) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{6}
}

func (m *Proof) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Proof.Unmarshal(m, b)
}
func (m *Proof) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Proof.Marshal(b, m, deterministic)
}
func (m *Proof) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Proof.Merge(m, src)
}
func (m *Proof) XXX_Size() int {
	return xxx_messageInfo_Proof.Size(m)
}
func (m *Proof) XXX_DiscardUnknown() {
	xxx_messageInfo_Proof.DiscardUnknown(m)
}

var xxx_messageInfo_Proof proto.InternalMessageInfo

func (m *Proof) GetPublicKey() []byte {
	if m != nil {
		return m.PublicKey
	}
	return nil
}

func (m *Proof) GetSignature() []byte {
	if m != nil {
		return m.Signature
	}
	return nil
}

//*
// Transaction
type Transaction struct {
	// Types that are valid to be assigned to Data:
	//	*Transaction_Rebalance
	//	*Transaction_Witness
	//	*Transaction_Order
	Data                 isTransaction_Data `protobuf_oneof:"data"`
	XXX_NoUnkeyedLiteral struct{}           `json:"-"`
	XXX_unrecognized     []byte             `json:"-"`
	XXX_sizecache        int32              `json:"-"`
}

func (m *Transaction) Reset()         { *m = Transaction{} }
func (m *Transaction) String() string { return proto.CompactTextString(m) }
func (*Transaction) ProtoMessage()    {}
func (*Transaction) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{7}
}

func (m *Transaction) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Transaction.Unmarshal(m, b)
}
func (m *Transaction) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Transaction.Marshal(b, m, deterministic)
}
func (m *Transaction) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Transaction.Merge(m, src)
}
func (m *Transaction) XXX_Size() int {
	return xxx_messageInfo_Transaction.Size(m)
}
func (m *Transaction) XXX_DiscardUnknown() {
	xxx_messageInfo_Transaction.DiscardUnknown(m)
}

var xxx_messageInfo_Transaction proto.InternalMessageInfo

type isTransaction_Data interface {
	isTransaction_Data()
}

type Transaction_Rebalance struct {
	Rebalance *TransactionRebalance `protobuf:"bytes,1,opt,name=rebalance,proto3,oneof"`
}

type Transaction_Witness struct {
	Witness *TransactionWitness `protobuf:"bytes,2,opt,name=witness,proto3,oneof"`
}

type Transaction_Order struct {
	Order *TransactionOrder `protobuf:"bytes,3,opt,name=order,proto3,oneof"`
}

func (*Transaction_Rebalance) isTransaction_Data() {}

func (*Transaction_Witness) isTransaction_Data() {}

func (*Transaction_Order) isTransaction_Data() {}

func (m *Transaction) GetData() isTransaction_Data {
	if m != nil {
		return m.Data
	}
	return nil
}

func (m *Transaction) GetRebalance() *TransactionRebalance {
	if x, ok := m.GetData().(*Transaction_Rebalance); ok {
		return x.Rebalance
	}
	return nil
}

func (m *Transaction) GetWitness() *TransactionWitness {
	if x, ok := m.GetData().(*Transaction_Witness); ok {
		return x.Witness
	}
	return nil
}

func (m *Transaction) GetOrder() *TransactionOrder {
	if x, ok := m.GetData().(*Transaction_Order); ok {
		return x.Order
	}
	return nil
}

// XXX_OneofWrappers is for the internal use of the proto package.
func (*Transaction) XXX_OneofWrappers() []interface{} {
	return []interface{}{
		(*Transaction_Rebalance)(nil),
		(*Transaction_Witness)(nil),
		(*Transaction_Order)(nil),
	}
}

//*
// TransactionRebalance
type TransactionRebalance struct {
	RoundInfo            *RoundInfo `protobuf:"bytes,2,opt,name=round_info,json=roundInfo,proto3" json:"round_info,omitempty"`
	XXX_NoUnkeyedLiteral struct{}   `json:"-"`
	XXX_unrecognized     []byte     `json:"-"`
	XXX_sizecache        int32      `json:"-"`
}

func (m *TransactionRebalance) Reset()         { *m = TransactionRebalance{} }
func (m *TransactionRebalance) String() string { return proto.CompactTextString(m) }
func (*TransactionRebalance) ProtoMessage()    {}
func (*TransactionRebalance) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{8}
}

func (m *TransactionRebalance) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransactionRebalance.Unmarshal(m, b)
}
func (m *TransactionRebalance) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransactionRebalance.Marshal(b, m, deterministic)
}
func (m *TransactionRebalance) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransactionRebalance.Merge(m, src)
}
func (m *TransactionRebalance) XXX_Size() int {
	return xxx_messageInfo_TransactionRebalance.Size(m)
}
func (m *TransactionRebalance) XXX_DiscardUnknown() {
	xxx_messageInfo_TransactionRebalance.DiscardUnknown(m)
}

var xxx_messageInfo_TransactionRebalance proto.InternalMessageInfo

func (m *TransactionRebalance) GetRoundInfo() *RoundInfo {
	if m != nil {
		return m.RoundInfo
	}
	return nil
}

//*
// TransactionWitness performs state modification of Stake Event transactions (modify staker's balance).
// This transaction should be originated from the validator nodes.
type TransactionWitness struct {
	Subject              TransactionWitness_Subject `protobuf:"varint,1,opt,name=subject,proto3,enum=kosu.TransactionWitness_Subject" json:"subject,omitempty"`
	Amount               *BigInt                    `protobuf:"bytes,2,opt,name=amount,proto3" json:"amount,omitempty"`
	Block                uint64                     `protobuf:"varint,3,opt,name=block,proto3" json:"block,omitempty"`
	Address              string                     `protobuf:"bytes,4,opt,name=address,proto3" json:"address,omitempty"`
	PublicKey            []byte                     `protobuf:"bytes,5,opt,name=public_key,json=publicKey,proto3" json:"public_key,omitempty"`
	Id                   []byte                     `protobuf:"bytes,6,opt,name=id,proto3" json:"id,omitempty"`
	Confirmations        uint64                     `protobuf:"varint,7,opt,name=confirmations,proto3" json:"confirmations,omitempty"`
	XXX_NoUnkeyedLiteral struct{}                   `json:"-"`
	XXX_unrecognized     []byte                     `json:"-"`
	XXX_sizecache        int32                      `json:"-"`
}

func (m *TransactionWitness) Reset()         { *m = TransactionWitness{} }
func (m *TransactionWitness) String() string { return proto.CompactTextString(m) }
func (*TransactionWitness) ProtoMessage()    {}
func (*TransactionWitness) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{9}
}

func (m *TransactionWitness) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransactionWitness.Unmarshal(m, b)
}
func (m *TransactionWitness) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransactionWitness.Marshal(b, m, deterministic)
}
func (m *TransactionWitness) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransactionWitness.Merge(m, src)
}
func (m *TransactionWitness) XXX_Size() int {
	return xxx_messageInfo_TransactionWitness.Size(m)
}
func (m *TransactionWitness) XXX_DiscardUnknown() {
	xxx_messageInfo_TransactionWitness.DiscardUnknown(m)
}

var xxx_messageInfo_TransactionWitness proto.InternalMessageInfo

func (m *TransactionWitness) GetSubject() TransactionWitness_Subject {
	if m != nil {
		return m.Subject
	}
	return TransactionWitness_POSTER
}

func (m *TransactionWitness) GetAmount() *BigInt {
	if m != nil {
		return m.Amount
	}
	return nil
}

func (m *TransactionWitness) GetBlock() uint64 {
	if m != nil {
		return m.Block
	}
	return 0
}

func (m *TransactionWitness) GetAddress() string {
	if m != nil {
		return m.Address
	}
	return ""
}

func (m *TransactionWitness) GetPublicKey() []byte {
	if m != nil {
		return m.PublicKey
	}
	return nil
}

func (m *TransactionWitness) GetId() []byte {
	if m != nil {
		return m.Id
	}
	return nil
}

func (m *TransactionWitness) GetConfirmations() uint64 {
	if m != nil {
		return m.Confirmations
	}
	return 0
}

//*
// TransactionOrder contains a signed order from a poster, and modifies their remaining period limit.
//
// This transaction can originate from anywhere, so long as the address recovered from the poster
// signature has a non-zero balance of Kosu tokens (they are a poster).
type TransactionOrder struct {
	SubContract          string            `protobuf:"bytes,1,opt,name=subContract,proto3" json:"subContract,omitempty"`
	Maker                string            `protobuf:"bytes,2,opt,name=maker,proto3" json:"maker,omitempty"`
	Arguments            *OrderArguments   `protobuf:"bytes,3,opt,name=arguments,proto3" json:"arguments,omitempty"`
	MakerValues          map[string]string `protobuf:"bytes,4,rep,name=makerValues,proto3" json:"makerValues,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
	MakerSignature       string            `protobuf:"bytes,5,opt,name=makerSignature,proto3" json:"makerSignature,omitempty"`
	PosterSignature      string            `protobuf:"bytes,6,opt,name=posterSignature,proto3" json:"posterSignature,omitempty"`
	XXX_NoUnkeyedLiteral struct{}          `json:"-"`
	XXX_unrecognized     []byte            `json:"-"`
	XXX_sizecache        int32             `json:"-"`
}

func (m *TransactionOrder) Reset()         { *m = TransactionOrder{} }
func (m *TransactionOrder) String() string { return proto.CompactTextString(m) }
func (*TransactionOrder) ProtoMessage()    {}
func (*TransactionOrder) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{10}
}

func (m *TransactionOrder) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransactionOrder.Unmarshal(m, b)
}
func (m *TransactionOrder) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransactionOrder.Marshal(b, m, deterministic)
}
func (m *TransactionOrder) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransactionOrder.Merge(m, src)
}
func (m *TransactionOrder) XXX_Size() int {
	return xxx_messageInfo_TransactionOrder.Size(m)
}
func (m *TransactionOrder) XXX_DiscardUnknown() {
	xxx_messageInfo_TransactionOrder.DiscardUnknown(m)
}

var xxx_messageInfo_TransactionOrder proto.InternalMessageInfo

func (m *TransactionOrder) GetSubContract() string {
	if m != nil {
		return m.SubContract
	}
	return ""
}

func (m *TransactionOrder) GetMaker() string {
	if m != nil {
		return m.Maker
	}
	return ""
}

func (m *TransactionOrder) GetArguments() *OrderArguments {
	if m != nil {
		return m.Arguments
	}
	return nil
}

func (m *TransactionOrder) GetMakerValues() map[string]string {
	if m != nil {
		return m.MakerValues
	}
	return nil
}

func (m *TransactionOrder) GetMakerSignature() string {
	if m != nil {
		return m.MakerSignature
	}
	return ""
}

func (m *TransactionOrder) GetPosterSignature() string {
	if m != nil {
		return m.PosterSignature
	}
	return ""
}

type OrderArguments struct {
	Maker                []*OrderArgument `protobuf:"bytes,1,rep,name=maker,proto3" json:"maker,omitempty"`
	Taker                []*OrderArgument `protobuf:"bytes,2,rep,name=taker,proto3" json:"taker,omitempty"`
	XXX_NoUnkeyedLiteral struct{}         `json:"-"`
	XXX_unrecognized     []byte           `json:"-"`
	XXX_sizecache        int32            `json:"-"`
}

func (m *OrderArguments) Reset()         { *m = OrderArguments{} }
func (m *OrderArguments) String() string { return proto.CompactTextString(m) }
func (*OrderArguments) ProtoMessage()    {}
func (*OrderArguments) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{11}
}

func (m *OrderArguments) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_OrderArguments.Unmarshal(m, b)
}
func (m *OrderArguments) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_OrderArguments.Marshal(b, m, deterministic)
}
func (m *OrderArguments) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OrderArguments.Merge(m, src)
}
func (m *OrderArguments) XXX_Size() int {
	return xxx_messageInfo_OrderArguments.Size(m)
}
func (m *OrderArguments) XXX_DiscardUnknown() {
	xxx_messageInfo_OrderArguments.DiscardUnknown(m)
}

var xxx_messageInfo_OrderArguments proto.InternalMessageInfo

func (m *OrderArguments) GetMaker() []*OrderArgument {
	if m != nil {
		return m.Maker
	}
	return nil
}

func (m *OrderArguments) GetTaker() []*OrderArgument {
	if m != nil {
		return m.Taker
	}
	return nil
}

type OrderArgument struct {
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Datatype             string   `protobuf:"bytes,2,opt,name=datatype,proto3" json:"datatype,omitempty"`
	SignatureFields      []int64  `protobuf:"varint,3,rep,packed,name=signatureFields,proto3" json:"signatureFields,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *OrderArgument) Reset()         { *m = OrderArgument{} }
func (m *OrderArgument) String() string { return proto.CompactTextString(m) }
func (*OrderArgument) ProtoMessage()    {}
func (*OrderArgument) Descriptor() ([]byte, []int) {
	return fileDescriptor_d938547f84707355, []int{12}
}

func (m *OrderArgument) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_OrderArgument.Unmarshal(m, b)
}
func (m *OrderArgument) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_OrderArgument.Marshal(b, m, deterministic)
}
func (m *OrderArgument) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OrderArgument.Merge(m, src)
}
func (m *OrderArgument) XXX_Size() int {
	return xxx_messageInfo_OrderArgument.Size(m)
}
func (m *OrderArgument) XXX_DiscardUnknown() {
	xxx_messageInfo_OrderArgument.DiscardUnknown(m)
}

var xxx_messageInfo_OrderArgument proto.InternalMessageInfo

func (m *OrderArgument) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *OrderArgument) GetDatatype() string {
	if m != nil {
		return m.Datatype
	}
	return ""
}

func (m *OrderArgument) GetSignatureFields() []int64 {
	if m != nil {
		return m.SignatureFields
	}
	return nil
}

func init() {
	proto.RegisterEnum("kosu.TransactionWitness_Subject", TransactionWitness_Subject_name, TransactionWitness_Subject_value)
	proto.RegisterType((*BigInt)(nil), "kosu.BigInt")
	proto.RegisterType((*RoundInfo)(nil), "kosu.RoundInfo")
	proto.RegisterType((*ConsensusParams)(nil), "kosu.ConsensusParams")
	proto.RegisterType((*Poster)(nil), "kosu.Poster")
	proto.RegisterType((*Validator)(nil), "kosu.Validator")
	proto.RegisterType((*SignedTransaction)(nil), "kosu.SignedTransaction")
	proto.RegisterType((*Proof)(nil), "kosu.Proof")
	proto.RegisterType((*Transaction)(nil), "kosu.Transaction")
	proto.RegisterType((*TransactionRebalance)(nil), "kosu.TransactionRebalance")
	proto.RegisterType((*TransactionWitness)(nil), "kosu.TransactionWitness")
	proto.RegisterType((*TransactionOrder)(nil), "kosu.TransactionOrder")
	proto.RegisterMapType((map[string]string)(nil), "kosu.TransactionOrder.MakerValuesEntry")
	proto.RegisterType((*OrderArguments)(nil), "kosu.OrderArguments")
	proto.RegisterType((*OrderArgument)(nil), "kosu.OrderArgument")
}

func init() { proto.RegisterFile("types.proto", fileDescriptor_d938547f84707355) }

var fileDescriptor_d938547f84707355 = []byte{
	// 973 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x94, 0x56, 0xdd, 0x6e, 0xdb, 0x36,
	0x14, 0x8e, 0xe5, 0xbf, 0xe8, 0xc8, 0x4e, 0x1c, 0x36, 0xeb, 0x84, 0xac, 0x2b, 0x52, 0x21, 0xe8,
	0x5c, 0x60, 0x30, 0x06, 0xaf, 0x17, 0x43, 0x2e, 0x06, 0xd8, 0x69, 0x83, 0x04, 0x6b, 0x11, 0x83,
	0x09, 0x32, 0x6c, 0x37, 0x01, 0x6d, 0xd1, 0x0e, 0x17, 0x99, 0x34, 0x48, 0xaa, 0x8d, 0x9f, 0x63,
	0x4f, 0xb0, 0xa7, 0xd8, 0x83, 0xec, 0x72, 0x2f, 0x33, 0x90, 0x94, 0x22, 0xf9, 0xa7, 0x17, 0xbb,
	0xd3, 0xf7, 0x9d, 0x1f, 0x1e, 0x7d, 0x87, 0xe7, 0x48, 0x10, 0xe8, 0xe5, 0x82, 0xaa, 0xde, 0x42,
	0x0a, 0x2d, 0x50, 0xed, 0x41, 0xa8, 0x34, 0x7a, 0x09, 0x8d, 0x21, 0x9b, 0x5d, 0x72, 0x8d, 0x0e,
	0xa1, 0xfe, 0x89, 0x24, 0x29, 0x0d, 0x2b, 0xc7, 0x95, 0x6e, 0x0b, 0x3b, 0x10, 0x09, 0xf0, 0xb1,
	0x48, 0x79, 0x7c, 0xc9, 0xa7, 0x02, 0x3d, 0x87, 0x06, 0x4f, 0xe7, 0x63, 0x2a, 0xad, 0x4f, 0x0d,
	0x67, 0x08, 0x7d, 0x03, 0xbe, 0xd2, 0x44, 0x6a, 0x75, 0x47, 0x74, 0xe8, 0x59, 0xd3, 0xae, 0x23,
	0x06, 0x1a, 0x7d, 0x0d, 0x4d, 0xca, 0x63, 0x6b, 0xaa, 0xba, 0x28, 0x03, 0x07, 0xf6, 0xc0, 0x84,
	0xcd, 0x99, 0x0e, 0x6b, 0x96, 0x76, 0x20, 0xfa, 0xd3, 0x83, 0xfd, 0x33, 0xc1, 0x15, 0xe5, 0x2a,
	0x55, 0x23, 0x22, 0xc9, 0x5c, 0xa1, 0xef, 0xe1, 0xe0, 0x9c, 0x71, 0x92, 0x30, 0xbd, 0xbc, 0xb9,
	0x97, 0x54, 0xdd, 0x8b, 0x24, 0xb6, 0x25, 0xb4, 0xf1, 0xa6, 0x01, 0x1d, 0x43, 0x30, 0xa2, 0x92,
	0x89, 0xf8, 0x83, 0xcd, 0xee, 0xea, 0x29, 0x53, 0x28, 0x82, 0x56, 0x06, 0x29, 0x9f, 0xe9, 0x7b,
	0x5b, 0x57, 0x1b, 0xaf, 0x70, 0xe8, 0x04, 0xda, 0x1f, 0xc9, 0xe3, 0x95, 0x8c, 0xa9, 0x1c, 0x2e,
	0x35, 0x55, 0xb6, 0xca, 0x36, 0x5e, 0x25, 0xd1, 0x5b, 0xf8, 0xea, 0x4c, 0xf0, 0x29, 0x93, 0x73,
	0xa2, 0x99, 0xe0, 0x45, 0x75, 0x75, 0x7b, 0xea, 0x76, 0x23, 0xfa, 0x01, 0x9e, 0x0d, 0x13, 0x31,
	0x79, 0x50, 0x43, 0x3a, 0x15, 0x92, 0x8e, 0x64, 0xca, 0x19, 0x9f, 0x85, 0x0d, 0x1b, 0xb3, 0xcd,
	0x14, 0x9d, 0x43, 0x63, 0x24, 0x94, 0xa6, 0x12, 0xbd, 0x86, 0xe6, 0x98, 0x24, 0x84, 0x4f, 0x5c,
	0xa3, 0x82, 0x7e, 0xab, 0x67, 0x1a, 0xd9, 0x73, 0x5d, 0xc4, 0xb9, 0xb1, 0x50, 0xd7, 0x2b, 0xab,
	0xfb, 0x8f, 0x07, 0xfe, 0x2d, 0x49, 0x58, 0x4c, 0xb4, 0xf8, 0x5f, 0xb9, 0x16, 0xe2, 0x33, 0x95,
	0x36, 0x57, 0x15, 0x3b, 0x80, 0x5e, 0x80, 0xbf, 0x48, 0xc7, 0x09, 0x9b, 0xfc, 0x42, 0x97, 0x56,
	0xc2, 0x16, 0x2e, 0x08, 0xf4, 0x12, 0x80, 0xea, 0xfb, 0xc1, 0x64, 0x22, 0x52, 0xee, 0x5a, 0xec,
	0xe3, 0x12, 0x63, 0xa2, 0xa7, 0x4c, 0x2a, 0x7d, 0x2b, 0x34, 0xb5, 0x6a, 0x55, 0x71, 0x41, 0x18,
	0x6b, 0x42, 0xdc, 0x73, 0x6c, 0x75, 0xa9, 0xe2, 0x82, 0x30, 0xfd, 0x33, 0x60, 0x24, 0xc5, 0x42,
	0x28, 0x1a, 0x87, 0x4d, 0xeb, 0xb0, 0xc2, 0x99, 0xf3, 0xb5, 0xd0, 0x24, 0x31, 0x11, 0x2a, 0xdc,
	0xb5, 0x1e, 0x25, 0xc6, 0xdc, 0x65, 0x32, 0xd1, 0xec, 0x13, 0x0d, 0xfd, 0xe3, 0x4a, 0x77, 0x17,
	0x67, 0x08, 0x85, 0xd0, 0x9c, 0x51, 0x4e, 0x15, 0x53, 0x21, 0x58, 0x43, 0x0e, 0x8d, 0x85, 0x2c,
	0x16, 0x09, 0xa3, 0x71, 0x18, 0x38, 0x4b, 0x06, 0xa3, 0xdf, 0xe0, 0xe0, 0x9a, 0xcd, 0x38, 0x8d,
	0x6f, 0x24, 0xe1, 0xca, 0x24, 0x12, 0x1c, 0xbd, 0x82, 0xfa, 0x42, 0x0a, 0x31, 0xcd, 0xa4, 0x0d,
	0x9c, 0xb4, 0x23, 0x43, 0x61, 0x67, 0x41, 0xaf, 0xc0, 0xd3, 0x8f, 0x56, 0xd4, 0xa0, 0x7f, 0xe0,
	0xec, 0xa5, 0x0c, 0xd8, 0xd3, 0x8f, 0xd1, 0x3b, 0xa8, 0xdb, 0x10, 0xf4, 0x2d, 0x80, 0x13, 0xf7,
	0xee, 0x81, 0x2e, 0xb3, 0x19, 0x2d, 0xc9, 0xfd, 0x02, 0x7c, 0xc5, 0x66, 0x9c, 0xe8, 0x54, 0x52,
	0x9b, 0xb1, 0x85, 0x0b, 0x22, 0xfa, 0xbb, 0x02, 0x41, 0xb9, 0xb6, 0x53, 0xf0, 0x25, 0x5d, 0x6d,
	0xfd, 0xd1, 0xe6, 0xf9, 0xb9, 0xc7, 0xc5, 0x0e, 0x2e, 0xdc, 0xd1, 0x5b, 0x68, 0x7e, 0x66, 0x9a,
	0x53, 0xa5, 0xb2, 0xca, 0xc3, 0x8d, 0xc8, 0x5f, 0x9d, 0xfd, 0x62, 0x07, 0xe7, 0xae, 0xa8, 0x07,
	0x75, 0x61, 0xc6, 0xc6, 0x5e, 0x94, 0xa0, 0xff, 0x7c, 0x23, 0xc6, 0x0e, 0xd5, 0xc5, 0x0e, 0x76,
	0x6e, 0xc3, 0x06, 0xd4, 0x62, 0xa2, 0x49, 0x74, 0x0e, 0x87, 0xdb, 0x4a, 0x42, 0x3d, 0x00, 0x69,
	0xf6, 0xd2, 0x1d, 0xe3, 0x53, 0x91, 0x15, 0xb2, 0xef, 0x92, 0x3e, 0xed, 0x2b, 0xec, 0xcb, 0xfc,
	0x31, 0xfa, 0xcb, 0x03, 0xb4, 0x59, 0x21, 0x3a, 0x85, 0xa6, 0x4a, 0xc7, 0x7f, 0xd0, 0x89, 0xb6,
	0x32, 0xec, 0xf5, 0x8f, 0xbf, 0xf4, 0x32, 0xbd, 0x6b, 0xe7, 0x87, 0xf3, 0x00, 0x74, 0x02, 0x0d,
	0x32, 0xb7, 0xb7, 0xdb, 0xdb, 0x32, 0x3c, 0x99, 0xcd, 0xcc, 0xce, 0xd8, 0x0c, 0x74, 0xb6, 0xfc,
	0x1c, 0xb0, 0x77, 0x29, 0x8e, 0xa5, 0x11, 0xd1, 0x8d, 0x46, 0x0e, 0xd7, 0xfa, 0x5c, 0x5f, 0xef,
	0xf3, 0x1e, 0x78, 0xcc, 0x4d, 0x44, 0x0b, 0x7b, 0x2c, 0x36, 0x6b, 0x6a, 0x52, 0xda, 0x31, 0xca,
	0xce, 0x42, 0x0d, 0xaf, 0x92, 0xd1, 0x09, 0x34, 0xb3, 0xf2, 0x11, 0x40, 0x63, 0x74, 0x75, 0x7d,
	0xf3, 0x1e, 0x77, 0x76, 0x50, 0x1b, 0xfc, 0xdb, 0xc1, 0x87, 0xcb, 0x77, 0x83, 0x9b, 0x2b, 0xdc,
	0xa9, 0x44, 0xff, 0x7a, 0xd0, 0x59, 0xef, 0x88, 0xd9, 0xa6, 0x2a, 0x1d, 0x9f, 0x09, 0xae, 0x25,
	0xc9, 0x54, 0xf2, 0x71, 0x99, 0x32, 0x6f, 0x38, 0x27, 0x0f, 0xd9, 0x76, 0xf0, 0xb1, 0x03, 0xa8,
	0x0f, 0x3e, 0x91, 0xb3, 0x74, 0x4e, 0xb9, 0x56, 0x59, 0xd3, 0x0f, 0x9d, 0x40, 0x36, 0xef, 0x20,
	0xb7, 0xe1, 0xc2, 0x0d, 0x5d, 0x42, 0x60, 0x83, 0x6f, 0xcd, 0xa7, 0xc7, 0x28, 0x53, 0xed, 0x06,
	0xfd, 0xef, 0xb6, 0x5f, 0x95, 0xde, 0xc7, 0xc2, 0xf3, 0x3d, 0xd7, 0x72, 0x89, 0xcb, 0xb1, 0xe8,
	0x35, 0xec, 0x59, 0x78, 0xfd, 0x34, 0x14, 0x75, 0x5b, 0xdd, 0x1a, 0x8b, 0xba, 0xb0, 0xbf, 0xb0,
	0x8b, 0xb5, 0x70, 0x6c, 0x58, 0xc7, 0x75, 0xfa, 0xe8, 0x67, 0xe8, 0xac, 0x1f, 0x89, 0x3a, 0x50,
	0xcd, 0xa7, 0xd1, 0xc7, 0xe6, 0xb1, 0xf8, 0x8a, 0x66, 0x62, 0x58, 0x70, 0xea, 0xfd, 0x54, 0x89,
	0xa6, 0xb0, 0xb7, 0xfa, 0xe6, 0xe8, 0x4d, 0x2e, 0x5c, 0xc5, 0xbe, 0xe8, 0xb3, 0x2d, 0xf2, 0xe4,
	0x6a, 0xbe, 0x81, 0xba, 0xce, 0x34, 0xfe, 0xb2, 0xab, 0xf5, 0x88, 0x18, 0xb4, 0x57, 0x78, 0x84,
	0xa0, 0xc6, 0xc9, 0x9c, 0x66, 0x55, 0xda, 0x67, 0x74, 0x04, 0xbb, 0x66, 0xbc, 0xcc, 0xff, 0x40,
	0x56, 0xe9, 0x13, 0x36, 0x92, 0x3c, 0x6d, 0x8e, 0x73, 0x46, 0x93, 0xd8, 0xf4, 0xaf, 0xda, 0xad,
	0xe2, 0x75, 0x7a, 0xd8, 0xfc, 0xbd, 0x6e, 0xff, 0x28, 0xc6, 0x0d, 0xfb, 0x4b, 0xf1, 0xe3, 0x7f,
	0x01, 0x00, 0x00, 0xff, 0xff, 0x75, 0x7a, 0x09, 0x33, 0x61, 0x08, 0x00, 0x00,
}
