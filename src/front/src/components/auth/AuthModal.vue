<template>
  <Dialog
    :visible="show"
    @update:visible="(value: boolean) => emit('update:show', value)"
    modal
    :style="{ width: 'min(480px, 95vw)', maxHeight: '95vh' }"
    :closable="false"
    :draggable="false"
    class="modern-auth-modal"
    :pt="{
      root: 'bg-transparent',
      mask: 'bg-black/50 backdrop-blur-sm',
      content:
        'border-none shadow-none bg-transparent p-0 overflow-hidden rounded-3xl max-h-[95vh] overflow-y-auto',
    }"
  >
    <template #header>
      <div class="relative">
        <button
          @click="emit('update:show', false)"
          class="absolute top-2 right-2 md:top-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white/30 transition-all duration-200"
        >
          <i class="pi pi-times text-xs md:text-sm"></i>
        </button>

        <div
          class="relative bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white/90 to-secondary-50/80"
          ></div>

          <div
            class="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-2xl"
          ></div>
          <div
            class="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tl from-secondary-200/30 to-transparent rounded-full blur-2xl"
          ></div>

          <div class="relative z-10 p-6 md:p-8">
            <div class="text-center mb-6 md:mb-8">
              <div class="relative mx-auto mb-4 md:mb-6">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl blur opacity-30"
                ></div>
                <div
                  class="relative w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg mx-auto"
                >
                  <i class="pi pi-user text-white text-xl md:text-2xl"></i>
                </div>
              </div>

              <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                {{ isLoginView ? 'Bem-vindo de volta!' : 'Crie sua conta' }}
              </h3>

              <p class="text-sm md:text-base text-gray-600 leading-relaxed px-2 md:px-0">
                {{
                  isLoginView
                    ? 'Entre para gerenciar seu estoque e reduzir desperdícios de forma inteligente'
                    : 'Cadastre-se para começar a transformar seu negócio e reduzir desperdícios'
                }}
              </p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4 md:space-y-6">
              <div v-if="!isLoginView" class="animate-fade-in">
                <label for="name" class="block text-xs md:text-sm font-semibold text-gray-700 mb-2">
                  <i class="pi pi-user mr-2 text-primary-500"></i>
                  Nome completo
                </label>
                <div class="relative">
                  <InputText
                    id="name"
                    v-model="formValue.name"
                    placeholder="Digite seu nome completo"
                    class="w-full pl-3 md:pl-4 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl md:rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300"
                    :class="{ 'border-danger-300 bg-danger-50/50': nameError }"
                  />
                  <div v-if="nameError" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i class="pi pi-exclamation-triangle text-danger-400 text-sm"></i>
                  </div>
                </div>
                <small v-if="nameError" class="text-danger-500 text-xs mt-1 block">{{
                  nameError
                }}</small>
              </div>

              <div class="animate-fade-in" :style="{ animationDelay: '0.1s' }">
                <label
                  for="email"
                  class="block text-xs md:text-sm font-semibold text-gray-700 mb-2"
                >
                  <i class="pi pi-envelope mr-2 text-primary-500"></i>
                  Email
                </label>
                <div class="relative">
                  <InputText
                    id="email"
                    v-model="formValue.email"
                    type="email"
                    placeholder="Digite seu email"
                    class="w-full pl-3 md:pl-4 pr-3 md:pr-4 py-2.5 md:py-3 text-sm md:text-base rounded-xl md:rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300"
                    :class="{ 'border-danger-300 bg-danger-50/50': emailError }"
                  />
                  <div v-if="emailError" class="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i class="pi pi-exclamation-triangle text-danger-400 text-sm"></i>
                  </div>
                </div>
                <small v-if="emailError" class="text-danger-500 text-xs mt-1 block">{{
                  emailError
                }}</small>
              </div>

              <div class="animate-fade-in" :style="{ animationDelay: '0.2s' }">
                <label
                  for="password"
                  class="block text-xs md:text-sm font-semibold text-gray-700 mb-2"
                >
                  <i class="pi pi-lock mr-2 text-primary-500"></i>
                  Senha
                </label>
                <div class="relative">
                  <Password
                    id="password"
                    v-model="formValue.password"
                    placeholder="Digite sua senha"
                    :feedback="false"
                    toggleMask
                    class="w-full"
                    :pt="{
                      input: {
                        class:
                          'w-full pl-3 md:pl-4 pr-10 md:pr-12 py-2.5 md:py-3 text-sm md:text-base rounded-xl md:rounded-2xl border-2 border-gray-200/50 bg-white/50 backdrop-blur-sm focus:border-primary-300 focus:bg-white/80 transition-all duration-300 flex-1',
                      },
                    }"
                    :inputClass="{
                      'border-danger-300 bg-danger-50/50': passwordError,
                      'flex-1': true,
                    }"
                  />
                  <div
                    v-if="passwordError"
                    class="absolute inset-y-0 right-10 md:right-12 flex items-center pr-2 md:pr-3"
                  >
                    <i class="pi pi-exclamation-triangle text-danger-400 text-sm"></i>
                  </div>
                </div>
                <small v-if="passwordError" class="text-danger-500 text-xs mt-1 block">{{
                  passwordError
                }}</small>
              </div>

              <div
                v-if="isLoginView"
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 animate-fade-in"
                style="animation-delay: 0.3s"
              >
                <div class="flex items-center">
                  <Checkbox
                    v-model="rememberMe"
                    inputId="remember"
                    binary
                    class="mr-2"
                    :pt="{
                      box: 'w-4 h-4 md:w-5 md:h-5 border-2 border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm',
                    }"
                  />
                  <label for="remember" class="text-xs md:text-sm text-gray-600 font-medium"
                    >Lembrar de mim</label
                  >
                </div>
                <Button
                  label="Esqueceu sua senha?"
                  link
                  size="small"
                  class="text-primary-600 hover:text-primary-700 font-medium text-xs md:text-sm self-start sm:self-auto"
                />
              </div>

              <div class="animate-fade-in" :style="{ animationDelay: '0.4s' }">
                <Button
                  type="submit"
                  :label="isLoginView ? 'Entrar na conta' : 'Criar conta'"
                  :loading="loading"
                  class="w-full py-3 md:py-4 text-sm md:text-base bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-none"
                  :size="$attrs.isMobile ? 'normal' : 'large'"
                >
                  <template #icon>
                    <i class="pi pi-arrow-right ml-2"></i>
                  </template>
                </Button>
              </div>
            </form>

            <div class="my-6 md:my-8 animate-fade-in" style="animation-delay: 0.5s">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200/50"></div>
                </div>
                <div class="relative flex justify-center text-xs md:text-sm">
                  <span
                    class="px-3 md:px-4 bg-white/80 backdrop-blur-sm text-gray-500 font-medium rounded-full"
                  >
                    {{ isLoginView ? 'Novo por aqui?' : 'Já tem uma conta?' }}
                  </span>
                </div>
              </div>
            </div>

            <div class="text-center animate-fade-in" style="animation-delay: 0.6s">
              <Button
                :label="isLoginView ? 'Criar uma conta gratuita' : 'Fazer login'"
                link
                class="w-full py-2.5 md:py-3 text-sm md:text-base text-primary-600 hover:text-primary-700 font-semibold rounded-xl md:rounded-2xl hover:bg-primary-50/50 transition-all duration-300"
                :size="$attrs.isMobile ? 'normal' : 'large'"
                @click="toggleAuthView"
              />
            </div>

            <div
              class="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200/30 animate-fade-in"
              style="animation-delay: 0.7s"
            >
              <div class="grid grid-cols-3 gap-2 md:gap-4 text-center">
                <div class="text-center flex justify-center items-center gap-1">
                  <i class="pi pi-shield-check text-accent-500 text-base md:text-lg block"></i>
                  <span class="text-xs text-gray-500">Seguro</span>
                </div>
                <div class="text-center flex justify-center items-center gap-1">
                  <i class="pi pi-clock text-secondary-500 text-base md:text-lg block"></i>
                  <span class="text-xs text-gray-500">Rápido</span>
                </div>
                <div class="text-center flex justify-center items-center gap-1">
                  <i class="pi pi-star-fill text-yellow-500 text-base md:text-lg block"></i>
                  <span class="text-xs text-gray-500">Confiável</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import { authService } from '@/services/auth.service'
import type { AxiosError } from 'axios'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'login', credentials: { email: string; password: string; rememberMe: boolean }): void
  (e: 'register', data: RegisterData): void
}

interface RegisterData {
  name: string
  email: string
  password: string
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const router = useRouter()
const toast = useToast()
const isLoginView = ref(true)
const loading = ref(false)
const rememberMe = ref(false)

const formValue = ref({
  name: '',
  email: '',
  password: '',
})

const errors = ref({
  name: '',
  email: '',
  password: '',
})

const nameError = computed(() => errors.value.name)
const emailError = computed(() => errors.value.email)
const passwordError = computed(() => errors.value.password)

const validateForm = () => {
  errors.value = {
    name: '',
    email: '',
    password: '',
  }

  let isValid = true

  if (!isLoginView.value && !formValue.value.name.trim()) {
    errors.value.name = 'Por favor, digite seu nome'
    isValid = false
  }

  if (!formValue.value.email.trim()) {
    errors.value.email = 'Por favor, digite seu email'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.value.email)) {
    errors.value.email = 'Email inválido'
    isValid = false
  }

  if (!formValue.value.password.trim()) {
    errors.value.password = 'Por favor, digite sua senha'
    isValid = false
  } else if (formValue.value.password.length < 6) {
    errors.value.password = 'A senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  return isValid
}

const toggleAuthView = () => {
  isLoginView.value = !isLoginView.value
  formValue.value = {
    name: '',
    email: '',
    password: '',
  }
  errors.value = {
    name: '',
    email: '',
    password: '',
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    loading.value = true

    if (isLoginView.value) {
      const response = await authService.login({
        email: formValue.value.email,
        password: formValue.value.password,
      })

      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))

      toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado com sucesso!', life: 3000 })
      router.push('/app')
    } else {
      const response = await authService.register({
        name: formValue.value.name,
        email: formValue.value.email,
        password: formValue.value.password,
      })

      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))

      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Cadastro realizado com sucesso!',
        life: 3000,
      })
      router.push('/app')
    }

    emit('update:show', false)
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: axiosError.response?.data?.message || 'Erro ao realizar operação',
      life: 5000,
    })
  } finally {
    loading.value = false
  }
}
</script>
