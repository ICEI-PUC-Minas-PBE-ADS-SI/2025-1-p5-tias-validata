<template>
  <n-modal
    :show="show"
    @update:show="(value: boolean) => emit('update:show', value)"
    preset="card"
    style="max-width: 500px"
    :bordered="false"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <template #header>
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
          <i class="fas fa-user-lock text-primary"></i>
        </div>

        <h3 class="mt-3 text-lg font-medium text-gray-900">
          {{ isLoginView ? 'Acesse sua conta' : 'Crie sua conta' }}
        </h3>

        <p class="mt-2 text-sm text-gray-500">
          {{
            isLoginView
              ? 'Entre para gerenciar seu estoque e reduzir desperdícios'
              : 'Cadastre-se para começar a reduzir o desperdício em seu negócio'
          }}
        </p>
      </div>
    </template>

    <n-form ref="formRef" :model="formValue" :rules="rules" @submit.prevent="handleSubmit">
      <n-form-item v-if="!isLoginView" path="name" label="Nome completo">
        <n-input v-model:value="formValue.name" placeholder="Digite seu nome completo" />
      </n-form-item>

      <n-form-item path="email" label="Email">
        <n-input v-model:value="formValue.email" type="text" placeholder="Digite seu email" />
      </n-form-item>

      <n-form-item path="password" label="Senha">
        <n-input
          v-model:value="formValue.password"
          type="password"
          placeholder="Digite sua senha"
          show-password-on="click"
        />
      </n-form-item>

      <div v-if="isLoginView" class="flex items-center justify-between mb-4">
        <n-checkbox v-model:checked="rememberMe">Lembrar de mim</n-checkbox>
        <n-button text type="default" size="small">Esqueceu sua senha?</n-button>
      </div>

      <n-button attr-type="submit" block :loading="loading">
        {{ isLoginView ? 'Entrar' : 'Cadastrar' }}
      </n-button>
    </n-form>

    <template #footer>
      <div class="text-center">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              {{ isLoginView ? 'Novo por aqui?' : 'Já tem uma conta?' }}
            </span>
          </div>
        </div>

        <n-button block class="mt-4" @click="toggleAuthView">
          {{ isLoginView ? 'Criar uma conta' : 'Fazer login' }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { useRouter } from 'vue-router'
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
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const isLoginView = ref(true)
const loading = ref(false)
const rememberMe = ref(false)

const formValue = ref({
  name: '',
  email: '',
  password: '',
})

const rules = computed<FormRules>(() => ({
  name: [
    {
      required: !isLoginView.value,
      message: 'Por favor, digite seu nome',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: 'Por favor, digite seu email', trigger: 'blur' },
    { type: 'email', message: 'Email inválido', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Por favor, digite sua senha', trigger: 'blur' },
    { min: 6, message: 'A senha deve ter pelo menos 6 caracteres', trigger: 'blur' },
  ],
}))

const toggleAuthView = () => {
  isLoginView.value = !isLoginView.value
  formValue.value = {
    name: '',
    email: '',
    password: '',
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    loading.value = true
    await formRef.value.validate()

    if (isLoginView.value) {
      const response = await authService.login({
        email: formValue.value.email,
        password: formValue.value.password,
      })

      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))

      message.success('Login realizado com sucesso!')
      router.push('/app')
    } else {
      const response = await authService.register({
        name: formValue.value.name,
        email: formValue.value.email,
        password: formValue.value.password,
      })

      localStorage.setItem('token', response.access_token)
      localStorage.setItem('user', JSON.stringify(response.user))

      message.success('Cadastro realizado com sucesso!')
      router.push('/app')
    }

    emit('update:show', false)
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>
    message.error(axiosError.response?.data?.message || 'Erro ao realizar operação')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  :deep(.n-form-item) {
    margin-bottom: 16px;
  }
}
</style>
