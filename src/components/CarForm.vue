<script setup>

const engineTypes = [
  'unknown',
  '2 stroke',
  '4 cylinder',
  'v6',
  'v8',
  'v10',
  'v12',
  'small',
  'medium',
  'large',
  'chuncko',
]

</script>


<template>
  <form class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <label for="car-make" class="form-label">Car Make</label>
        <input id="car-make" class="form-control" type="text" required minlength="3" maxlength="500">
      </div>
      <div class="col-md-6">
        <label for="car-model" class="form-label">Car Model</label>
        <input id="car-model" class="form-control" type="text" required minlength="1" maxlength="500">
      </div>
      <div class="col-md-6">
        <label for="car-year" class="form-label">Car Year</label>
        <input id="car-year" class="form-control" type="number" required min="1885" :max="new Date().getFullYear() + 1">
      </div>
      <div class="col-md-6">
        <label for="car-price" class="form-label">Car Price</label>
        <input id="car-price" class="form-control" type="number" required min="0" max="1000000">
      </div>
      <div class="col-md-6">
        <label for="car-description" class="form-label">Car Description</label>
        <textarea id="car-description" maxlength="500" placeholder="Describe your car!" class="form-control"></textarea>
      </div>
      <div class="col-md-6 d-flex gap-4">
        <div>
          <label for="car-color" class="form-label">Car Color</label>
          <input type="color" class="form-control form-control-color">
        </div>
        <div class="flex-grow-1">
          <label for="car-engine-type" class="form-label">Select an engine type</label>
          <select id="" class="form-control">
            <option value="" disabled>Select an engine please</option>
            <option v-for="engineType in engineTypes" :key="engineType" value="">
              {{ engineType }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-12">
        <label for="car-img-url" class="form-label">Car ImgUrl</label>
        <input id="car-img-url" class="form-control" type="url" required maxlength="1000">
      </div>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>