declare module 'quagga' {
  interface Point {
    x: number
    y: number
  }

  interface DecodedCode {
    code: number
    start: number
    end: number
    error?: number
  }

  interface CodeResult {
    code: string
    start: number
    end: number
    codeset: string
    startInfo: {
      error: number
      code: number
      start: number
      end: number
    }
    decodedCodes: DecodedCode[]
    direction: number
    format: string
  }

  export interface QuaggaResult {
    codeResult: CodeResult
    line: Point[]
    angle: number
    pattern: number[]
    box: [Point, Point, Point, Point]
    boxes: [Point, Point, Point, Point][]
  }

  interface QuaggaConfig {
    inputStream: {
      name: string
      type: string
      target: HTMLElement | null
      constraints: {
        facingMode: string
      }
    }
    decoder: {
      readers: string[]
    }
  }

  interface QuaggaStatic {
    init(config: QuaggaConfig, callback: (err: Error | null) => void): void
    start(): void
    stop(): void
    onDetected(callback: (result: QuaggaResult) => void): void
    isRunning: boolean
  }

  const Quagga: QuaggaStatic
  export default Quagga
}
