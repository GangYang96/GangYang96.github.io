"""Local static preview with byte-range support for seeking videos. No dependencies."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        self.remaining = None
        file = Path(self.translate_path(self.path))
        request_range = self.headers.get('Range')
        if not request_range or not file.is_file():
            return super().send_head()
        size = file.stat().st_size
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', request_range.strip())
        if not match or not size or not any(match.groups()):
            self.send_error(416, 'Unsupported range')
            return None
        first, last = match.groups()
        start = int(first) if first else max(0, size - int(last))
        end = min(size - 1, int(last)) if first and last else size - 1
        if start >= size or start > end:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.end_headers()
            return None
        handle = file.open('rb')
        handle.seek(start)
        self.remaining = end - start + 1
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(str(file)))
        self.send_header('Content-Length', str(self.remaining))
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.end_headers()
        return handle

    def copyfile(self, source, output):
        if self.remaining is None:
            return super().copyfile(source, output)
        remaining = self.remaining
        while remaining:
            chunk = source.read(min(65536, remaining))
            if not chunk:
                break
            output.write(chunk)
            remaining -= len(chunk)

    def log_message(self, format, *args):
        pass


if __name__ == '__main__':
    print('Preview: http://127.0.0.1:8767/ (Ctrl+C to stop)', flush=True)
    try:
        ThreadingHTTPServer(('127.0.0.1', 8767), Handler).serve_forever()
    except KeyboardInterrupt:
        pass
