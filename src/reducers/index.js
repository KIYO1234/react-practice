
// -------------- Reducer-------------------
// reducerファイルをimportして結合

// reducers/index.js はreducersを結合（combine）する役目

// reducer はactionを受け取る方（mutaionsのようなもの）
// reducerはstoreのstateを変更するためのもの（storeに内包されている）
// storeは一つだけ
// reducer のファイルは機能ごとに作る

// プログラムを動かすときはまとめて実行する（index.jsはreducerたちをまとめるためのファイル）

// combineReduces という機能を使ってreducerで作ったファイルたちを結合
// combineReducersをimport
import {combineReducers} from 'redux' //結合するためのもの

import counter from './counter' // 結合されるもの（結合したいもの（実際は複数になる））

import change from './change'
import add from './add'

export default combineReducers({counter, change, add}) // 複数ある場合は, で区切る

// オブジェクトになっているのにkey: valueの形になってない
// 省略記法（ほんとは {counter: counter}）だが同じ名前なら省略OK

