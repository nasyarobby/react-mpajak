import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import jenisPajak from "./../Data/KodeJenisSetoran";
import MonthSelect from "./../Components/MonthSelect";
import TahunPajakSelect from "./../Components/TahunPajakSelect";
import NominalPembayaran from "./../Components/NominalPembayaran";
import KetetapanTextField from "../Components/KetetapanTextField";
import Terbilang from "./../Components/Terbilang";
import { Button } from "@material-ui/core";

export default function CreateBilling() {
  const boxPadding = 1.4;
  const maximumNominal = 9999999999999;

  const findJenisPajak = kodeJenisPajak => {
    return new Promise(res => {
      let pajak = jenisPajak.find(e => e.kode === kodeJenisPajak);
      res(pajak);
    });
  };

  const findSetoran = kodeJenisSetoran => {
    return new Promise(res => {
      let setoran = state.jenisPajak.jenisSetoran.find(
        e => e.kode === kodeJenisSetoran
      );
      res(setoran);
    });
  };

  const [state, setState] = React.useState({
    jenisPajak: { kode: "", jenisSetoran: [] },
    jenisSetoran: { kode: "" },
    jenisSetoranIsDisabled: true,
    masaAwal: 1,
    masaAkhir: 12,
    masaAwalIsDisabled: false,
    masaAkhirIsDisabled: false,
    tahunPajak: new Date().getFullYear(),
    ketetapanIsVisible: false,
    nominalPembayaran: ""
  });

  const submitIsDisabled =
    state.jenisPajak.kode == "" ||
    state.jenisSetoran.kode == "" ||
    !state.masaAwal ||
    !state.masaAkhir ||
    !state.nominalPembayaran;

  const nominalPembayaranOnChangeHandler = e => {
    const value =
      Math.abs(e.target.value) > maximumNominal
        ? maximumNominal
        : Math.abs(e.target.value);
    setState({ ...state, nominalPembayaran: value });
  };

  const jenisPajakOnChangeHandler = async e => {
    let pajak = await findJenisPajak(e.target.value);
    setState({
      ...state,
      jenisPajak: pajak,
      jenisSetoran: { kode: "" },
      masaAwalIsDisabled: false,
      masaAkhirIsDisabled: false,
      jenisSetoranIsDisabled: false
    });
  };

  const jenisSetoranOnChangeHandler = async e => {
    let setoran = await findSetoran(e.target.value);
    console.log(setoran.kode);
    let ketetapanIsVisible, submitIsDisabled;

    if (Number(e.target.value) >= 300 && Number(e.target.value) <= 399) {
      ketetapanIsVisible = true;
    } else {
      ketetapanIsVisible = false;
    }

    if (setoran.annualOnly) {
      setState({
        ...state,
        jenisSetoran: setoran,
        masaAwal: 1,
        masaAkhir: 12,
        masaAwalIsDisabled: true,
        masaAkhirIsDisabled: true,
        ketetapanIsVisible
      });
    } else if (setoran.singleMonthOnly) {
      setState({
        ...state,
        jenisSetoran: setoran,
        masaAwalIsDisabled: false,
        masaAkhir: state.masaAwal,
        masaAkhirIsDisabled: true,
        ketetapanIsVisible
      });
    } else {
      setState({
        ...state,
        jenisSetoran: setoran,
        masaAwalIsDisabled: false,
        masaAkhirIsDisabled: false,
        ketetapanIsVisible
      });
    }
  };

  const masaAwalOnChangeHandler = e => {
    if (state.jenisSetoran.singleMonthOnly) {
      setState({
        ...state,
        masaAwal: e.target.value,
        masaAkhir: e.target.value
      });
    } else {
      setState({
        ...state,
        masaAwal: e.target.value,
        masaAkhir:
          state.masaAkhir < e.target.value ? e.target.value : state.masaAkhir
      });
    }
  };

  const masaAkhirOnChangeHandler = e => {
    setState({ ...state, masaAkhir: e.target.value });
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Box p={boxPadding}>
            <h1>Buat Surat Setoran Elektronik</h1>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <InputLabel>Jenis Pajak</InputLabel>
              <Select
                value={state.jenisPajak.kode}
                onChange={jenisPajakOnChangeHandler}
                inputProps={{
                  name: "age",
                  id: "age-native-simple"
                }}
              >
                {jenisPajak.map(e => (
                  <MenuItem key={e.kode} value={e.kode}>
                    {e.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <InputLabel>Jenis Setoran</InputLabel>
              <Select
                disabled={state.jenisSetoranIsDisabled}
                value={state.jenisSetoran.kode}
                onChange={jenisSetoranOnChangeHandler}
                inputProps={{
                  name: "age",
                  id: "age-native-simple"
                }}
              >
                {state.jenisPajak.jenisSetoran.map(e => {
                  return (
                    <MenuItem key={e.kode} value={e.kode}>
                      {e.text}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <InputLabel shrink>Masa</InputLabel>
              <MonthSelect
                disabled={state.masaAwalIsDisabled}
                value={state.masaAwal}
                onChangeHandler={masaAwalOnChangeHandler}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <InputLabel shrink>s.d. Masa</InputLabel>
              <MonthSelect
                start={state.masaAwal}
                disabled={state.masaAkhirIsDisabled}
                value={state.masaAkhir}
                onChangeHandler={masaAkhirOnChangeHandler}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <InputLabel shrink>Tahun Pajak</InputLabel>
              <TahunPajakSelect
                value={state.tahunPajak}
                min={1980}
                max={2020}
                reversed
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <NominalPembayaran
                onChange={nominalPembayaranOnChangeHandler}
                value={state.nominalPembayaran}
                helperText={
                  <Terbilang
                    value={state.nominalPembayaran}
                    suffix="rupiah"
                    uppercase
                  />
                }
              />
            </FormControl>
          </Box>
        </Grid>
        {state.ketetapanIsVisible && (
          <Grid item xs={12}>
            <Box p={boxPadding}>
              <FormControl fullWidth>
                <KetetapanTextField />
              </FormControl>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <TextField multiline label="Uraian (opsional)"></TextField>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box p={boxPadding}>
            <FormControl fullWidth>
              <Button
                disabled={submitIsDisabled}
                variant="contained"
                color="primary"
              >
                Buat SSE
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
